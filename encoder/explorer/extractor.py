import os
import json
from bs4 import BeautifulSoup

from explorer.settings import ROOT_DIR

def extract_style_links(directory):
    style_links = []

    for filename in os.listdir(directory):
        with open(os.path.join(directory, filename), 'r') as f:
            contents = f.read()

        soup = BeautifulSoup(contents, 'html.parser')

        for link in soup.find_all('a'):
            href = link.get('href')
            if href and href.startswith('/styles/'):
                
                # Extract first image url from link
                img = link.find('img')
                if img:
                    link_img = img.get('src')

                    # Extract style name from img alt

                    alt_text = img.get('alt')
                    if alt_text:
                        alt_text = alt_text.replace(' style in Midjourney AI | Midlibrary', '')

                    yield href, link_img, alt_text



def export_data_to_jsonl(list_dir, filename):

    style_links = extract_style_links(list_dir)
    with open(filename, 'w') as f:
        for i, (style_url, image_url, style_name) in enumerate(style_links):
            # Extract file name from image url
            file_name = image_url.split('/')[-1]
            data = {
                'url': style_url,
                'image_url': image_url,
                'file_name': file_name, 
                'name': style_name
            }
            f.write(json.dumps(data) + '\n')



def main():

    list_dir = os.path.join(ROOT_DIR, 'data', 'crawl', 'list')
    out_path = os.path.join(ROOT_DIR, 'data', 'styles.jsonl')

    export_data_to_jsonl(list_dir, out_path)


if __name__ == '__main__':
    main()
