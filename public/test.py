from pdf2image import convert_from_path
from PyPDF2 import PdfFileReader
import scholarly
import os
import json
from PIL import Image
export_path = "B:\\CUCSENotes_book_repo\\thumbnail\\"
input_path = "B:\\CUCSENotes_book_repo\\data\\"
data_path = "B:\\CUCSENotes_book_repo\\data\\data.json"
desired_props = ['/Subject','/Title','/Author','/CreationDate']
final_list = []

def generateThumbnail(export_path,input_path):
    for x in os.listdir(input_path):
        if ".pptx" in x:
            continue
        info = None
        path = input_path+x
        print(path)
        pages = convert_from_path(path,first_page=1,last_page=1)
        y = x.replace('.pdf','')
        exp_path = export_path+y+'.png'
        pages[0].save(exp_path,'PNG')

def generate_metadata(input_file):
    res = None
    if "paper" in input_file:
        print(input_file)
        try:
            res = next(scholarly.search_pubs_query(input_file.replace(".pdf","")))
        except StopIteration:
            print("",end="",sep="")
        finally:
            res = res.bib
        return res
    else:
        

#generateThumbnail(export_path,input_path)
for x in os.listdir(input_path):
    res = generate_metadata(x)
    if res == None:
       continue
    else:
        print(res)