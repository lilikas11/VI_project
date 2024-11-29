import csv
import json

# Função para estruturar os dados no formato desejado
def structure_data(data):
    structured_data = {}
    for row in data:
        region = row[0].strip()
        structured_data[region] = {
            "Total": {
                "Total": row[1].strip(),
                "Verde": row[2].strip(),
                "Tinto": row[3].strip()
            },
            "Vinho licoroso com DOP": {
                "Total": row[4].strip(),
                "Verde": row[5].strip(),
                "Tinto": row[6].strip()
            },
            "Vinho com DOP": {
                "Total": row[7].strip(),
                "Verde": row[8].strip(),
                "Tinto": row[9].strip()
            },
            "Vinho com IGP": {
                "Total": row[10].strip(),
                "Verde": row[11].strip(),
                "Tinto": row[12].strip()
            },
            "Vinho com indicação de casta": {
                "Total": row[13].strip(),
                "Verde": row[14].strip(),
                "Tinto": row[15].strip()
            },
            "Vinho sem certificação": {
                "Total": row[16].strip(),
                "Verde": row[17].strip(),
                "Tinto": row[18].strip()
            }
        }
    return structured_data

# Função principal para ler o CSV e converter para JSON
def csv_to_json(csv_file, json_file):
    with open(csv_file, newline='') as f:
        reader = csv.reader(f, delimiter=';')  # Adicionei delimiter=';'
        data = list(reader)

    # Chamar a função para estruturar os dados
    structured_data = structure_data(data)

    # Escrever o JSON no arquivo
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(structured_data, f, ensure_ascii=False, indent=4)
        
# Caminho para os arquivos CSV e JSON
csv_file = 'DataSet_Wine.csv'
json_file = 'DataSet_wine.json'

# Executa a função
csv_to_json(csv_file, json_file)
