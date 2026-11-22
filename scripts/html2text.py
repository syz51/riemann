# Convert a saved HTML page to plain text with link targets kept: html2text.py IN.html OUT.txt
# Run as: uv run --no-project python -I scripts/html2text.py IN.html OUT.txt
import sys, html.parser, re
class P(html.parser.HTMLParser):
    def __init__(s):
        super().__init__(); s.out=[]; s.skip=0
    def handle_starttag(s,t,a):
        if t in("script","style"): s.skip+=1
        if t in("p","br","div","li","h1","h2","h3","h4","tr","pre"): s.out.append("\n")
        if t=="a":
            h=dict(a).get("href")
            if h: s.out.append("[")
            s.href=h
    def handle_endtag(s,t):
        if t in("script","style"): s.skip-=1
        if t=="a" and getattr(s,"href",None): s.out.append("](%s)"%s.href); s.href=None
        if t in("td","th"): s.out.append(" | ")
    def handle_data(s,d):
        if not s.skip: s.out.append(d)
p=P(); p.feed(open(sys.argv[1],encoding="utf-8",errors="replace").read())
t="".join(p.out); t=re.sub(r"[ \t]+\n","\n",t); t=re.sub(r"\n{3,}","\n\n",t)
open(sys.argv[2],"w",encoding="utf-8").write(t.strip()+"\n")
