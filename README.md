# 🔎 JobScraper API

Este projeto implementa uma API em **Python/Flask** para realizar o _scraping_ de vagas de emprego (Gupy) e gerenciar os dados, junto com uma interface Frontend em **Next.js (TypeScript)** para consumo e visualização das vagas.

## 🚀 Tecnologias Principais

| Área | Tecnologia | Propósito |

| :----------- | :------------------------- | :------------------------------------------------------ |

| **Backend** | Python, Flask | Desenvolvimento da API REST e lógica de _scraping_. |

| **Scraping** | Módulo `scraper` | Execução da coleta de dados. |

| **Frontend** | Next.js, React, TypeScript | Estrutura da aplicação, tipagem e componentes da UI. |

| **Animação** | **GSAP ScrollTrigger** | Animações de _scroll_ e controle de estado na _Navbar_. |

---

## ⚙️ Funcionalidades da API (Flask)

A API é configurada para lidar com requisições POST para iniciar o _scraping_ e rotas GET para gerenciamento de arquivos persistentes.

- **POST `/scraper-gupy/<job_name>`**

  - Inicia o processo de _scraping_ para a vaga especificada.

  - **Salva o resultado** no disco (como um arquivo JSON) para persistência.

  - Retorna os dados coletados (código `201 Created`).

- **GET `/files`**

  - Lista todos os arquivos JSON de dados de vagas salvos no diretório `/files`.

- **GET `/files/<file_name>`**

  - Serve o arquivo JSON específico (ajustado para usar `<file_name>` para compatibilidade Flask).

---

## ⏭️ Próximos Passos e Evolução

Para a evolução do projeto, focarei em:

1. **Integração com Electron:** "containezar" a aplicação para baixar no desktop (MacOS, Linux, Windows).

2. **Persistência Avançada:** Migrar o salvamento de dados dos arquivos JSON para um banco de dados real (ex: **PostgreSQL**) para maior escalabilidade e poder de consulta.

# 📜 Licença

Este projeto é fornecido sob licença livre de uso, permitindo modificação e distribuição, **desde que não seja utilizado para fins comerciais**.

Para mais detalhes, consulte o arquivo `LICENSE` no repositório.
