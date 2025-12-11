import os
from flask import Flask, jsonify
from scraper import search_jobs_on_gupy
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'jobs.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, origins=["http://localhost:3000", "http://localhost:5000"])
db = SQLAlchemy(app)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    link = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(80), nullable=True)
    description = db.Column(db.JSON, nullable=True)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/vagas/read")
def read_all():
    all_jobs = Job.query.all()
    all_jobs_formatted = []
    for job in all_jobs:
        data_job = {
            "id": job.id,
            "title": job.title,
            "link": job.link,
            "company": job.company,
            "description": job.description
        }
        
        try:
            all_jobs_formatted.append(data_job)
        except:
            print(f"Erro ao ler esse emprego! {job.title}")
            
    print(f"Total de empregos: {len(all_jobs_formatted)}")
    return jsonify(all_jobs_formatted)

@app.route("/vagas/gupy/<job_name>")
def scraper_gupy(job_name):
    jobs_data = search_jobs_on_gupy(job_name)
    try:
        for job in jobs_data:
            if 'title' in job and 'link' in job:
                if Job.query.filter_by(link=job["link"]).first() == None:
                    new_job = Job(
                        title = job["title"],
                        link = job["link"],
                        company = job.get("company", "Has no Company"),
                        description = job.get("description", "Has no description")
                    )
                    db.session.add(new_job)
                    print(f'Emprego adicionado! {new_job.title}')
                else:
                    print(f"Emprego já existe! {job['title']}")
                
        db.session.commit()
        return jsonify({"message": "Todos os empregos foram salvos com sucesso!"})
    except Exception:
        return jsonify({"message": "Erro ao salvar os empregos!"}), 400
    
@app.route("/vagas/<job_id>")
def read_job(job_id):
    try:
        job_data = Job.query.get_or_404(job_id)
        job = {
            "id": job_data.id,
            "title": job_data.title,
            "link": job_data.link,
            "company": job_data.company,
            "description": job_data.description
        }
        return jsonify(job)
    except Exception as e:
        print(f"Erro ao buscar esse emprego! {e}")
        return jsonify({"message": "Erro ao buscar o emprego! Verifique o LOG"})

if __name__ == "__main__":
    app.run(debug=True)