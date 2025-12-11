from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

# urls
gupy_url = f"https://portal.gupy.io/pt/job-search/term="

# Search Gupy
def search_jobs_on_gupy(job_name):
    all_jobs = []
    number_page = 1
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()
            page.goto(gupy_url + job_name)
            
            while True:
                try:
                    page.wait_for_selector('a.IKqnq', timeout=5000)
                    html_content = page.content()
                    soup_job = BeautifulSoup(html_content, "html.parser")
                    jobs = soup_job.find_all('a', 'IKqnq')
                    print(f'Buscando empregos na página {number_page}')
                        
                    for job in jobs:
                        title = job.find('h3').get_text()
                        company = job.find('p', 'bpsGtj').get_text()
                        link = job['href']
                        descriptions = job.find_all('div', 'hCmVmU')
                        desc_formatted = []
                        for item in descriptions:
                            desc_formatted.append(item.get_text())
                        
                        job_data = {
                            "title": title,
                            "link": link,
                            "company": company,
                            "description": desc_formatted
                        }
                        
                        try:
                            all_jobs.append(job_data)
                        except:
                            print(f"Erro ao salvar o emprego na lista de empregos! {title}")   
                except:
                    print(f'Fim das páginas.')
                    break
                
                if jobs:
                    print(f"\nNúmero de empregos salvos: {len(all_jobs)} (pág. {number_page})") 
                    number_page += 1
                    print(number_page)
                    page.goto(f'{gupy_url}{job_name}?page={number_page}')   
                else:
                    break
            
        return all_jobs
                  
    except Exception as e:
        print(f"An error occurred: {e}")
        return []