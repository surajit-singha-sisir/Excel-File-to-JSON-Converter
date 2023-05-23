import json
import pandas as pd
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from django.http import HttpResponse

def read_excel(request):
    if request.method == 'POST' and request.FILES['excel_file']:
        excel_file = request.FILES['excel_file']

        # Read the Excel file using pandas
        df = pd.read_excel(excel_file)

        # Convert the data to JSON
        data = df.to_dict(orient='records')

        # Save the JSON data to a file with proper encoding for Bangla Unicode fonts
        with open('output.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False)

        # Read the JSON data from the file
        with open('output.json', 'r', encoding='utf-8') as f:
            json_data = f.read()

        # Return the JSON data as the response
        return HttpResponse(json_data, content_type='application/json')

    return render(request, 'read_excel.html')
