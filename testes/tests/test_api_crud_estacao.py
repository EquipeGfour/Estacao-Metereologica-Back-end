import requests
import json

URL_BASE = "http://localhost:5000/estacao"

class TestApiCrudEstacao:
    
    def test_cadastro_estacao(self):
        # JSON com os Dados da Estação
        data = {
            "uid": "123456",
            "nome": "Teste_API",
            "latitude": "-10",
            "longitude": "-20",
            "utc": "2023-03-16T17:30:00.000Z",
            "status": "ativo"
        }
        headers = {"Content-Type": "application/json"}

        # Post com os dados do JSON
        response = requests.post(URL_BASE + "/cadastrar", json.dumps(data), headers=headers)         
        
        # Verificação dos "Asserts"
        assert response.status_code == 200
        assert response.json()["uid"] == "123456"
        assert response.json()["nome"] == "Teste_API"
        assert response.json()["latitude"] == "-10"
        assert response.json()["longitude"] == "-20"

    def test_cadastrar_estacao_com_dados_incompletos(self):
        data = {   
            "uid": "12345",
            "data_criacao": "2023-03-16T17:30:00.000Z",
            "latitude": "-10",
            "longitude": "-20",
            "utc": "2023-03-16T17:30:00.000Z",
            "status": "ativo"
        }

        response = requests.post(URL_BASE + "/cadastrar", data=data)
        assert response.status_code == 500


    def test_buscar_todas_estacoes(self):
        response = requests.get(URL_BASE + "/buscar")
        assert response.status_code == 200

    def test_buscar_uma_estacao_especifica(self):
        response = requests.get(URL_BASE + "/buscar/1")
        assert response.status_code == 201
        assert response.json()["nome"] == "estacao_teste_1"
        # assert response.json()["uid"] == "902841ag202jh37243"

    def test_buscar_uma_estacao_especifica_por_nome(self):
        response = requests.get(URL_BASE + "/busca/Teste_Estação_API")
        assert response.status_code == 200


    def test_buscar_estacao_inexistente(self):
        response = requests.get(URL_BASE + "/buscar/9999")
        assert response.status_code == 404


    def test_editar_uma_estacao_especifica(self):
        data = {
            "latitude": "-1000",
            "longitude": "-2050",
        }
        headers = {"Content-Type": "application/json"}

        response = requests.put(URL_BASE + "/editar/1", json.dumps(data), headers=headers)
        assert response.status_code == 200

    def test_editar_estacao_inexistente(self):
        data = {
            "latitude": "-23.13299",
            "longitude": "-45.77372"
        }
        headers = {"Content-Type": "application/json"}

        response = requests.put(URL_BASE + "/editar/999", json.dumps(data), headers=headers)
        assert response.status_code == 500

    def test_excluir_estacao_por_nome(self):
        response = requests.delete(URL_BASE + "/excluir-nome/Teste_API")
        assert response.status_code == 200

    def test_excluir_estacao_inexistente_por_nome(self):
        response = requests.delete(URL_BASE + "/excluir-nome/Starlink")
        assert response.status_code == 404