import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = '1b87dd7ccc268b9b37627a6bc8824af0'

def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'DEN-Data-Observatory/1.0'})
    with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
        return json.loads(resp.read().decode('utf-8'))

# Subjects to query variables:
# 3: Inflasi, 8: Ekspor-Impor, 9: Industri Besar dan Sedang, 54: Perkebunan, 6: Tenaga Kerja
for sub_id, name in [(3, 'Inflasi'), (8, 'Ekspor-Impor'), (9, 'IBS'), (54, 'Perkebunan'), (6, 'Tenaga Kerja'), (5, 'Konsumsi')]:
    url = f'https://webapi.bps.go.id/v1/api/list/model/var/domain/0000/subject/{sub_id}/key/{api_key}/'
    res = fetch_json(url)
    if res.get('status') == 'OK' and len(res.get('data', [])) > 1:
        vars = res['data'][1]
        print(f"\n=== Subject {sub_id}: {name} ({len(vars)} variables) ===")
        for v in vars:
            print(f"  var_id: {v.get('var_id')} | {v.get('title')} [{v.get('unit')}]")
