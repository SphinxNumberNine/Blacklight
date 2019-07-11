import spacy 
from spacy.lang.en import English
from spacy.matcher import Matcher

from sklearn.pipeline import Pipeline

def readFile(path):
    with open(path, "rt") as f:
        return f.read()

def writeFile(path, contents):
    with open(path, "wt") as f:
        f.write(contents)

text = readFile("facebook_tos.txt") #testing on fb tos
nlp = spacy.load("en_core_web_md") 

doc = nlp(text) 
#print(doc.sents)
sentences = [nlp(sent.string.strip()) for sent in doc.sents]
matcher = Matcher(nlp.vocab)

p0 = [{"LOWER":"delete"}]
p1 = [{"LOWER":"permission"}]
p2 = [{"LOWER":"information"}]
p3 = [{"LOWER":"consent"}]
p4 = [{"LOWER":"authorize"}]
p5 = [{"LOWER":"knowledge"}]
p6 = [{"LOWER":"share"}]
p7 = [{"LOWER":"receive"}]
p8 = [{"LOWER":"personal"}]
p9 = [{"LOWER":"record"}]
p10 = [{"LOWER":"content"}]
p11 = [{"LOWER":"right"}]
p12 = [{"LOWER":"email"}]
p13 = [{"LOWER":"third"}, {"TEXT":"-", "OP": "?"}, {"LOWER":"party"}]
p14 = [{"LOWER":"3rd"}, {"TEXT":"-", "OP": "?"}, {"LOWER":"party"}]
patterns = [p0,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14]

for num in range(0,15):
    id = "p%d" % num
    matcher.add(id, None, patterns[num]) #add all patterns to matcher
    
matches = [matcher(sent) for sent in sentences] #match all sentences

relevant_sent = []
for match in range(len(matches)):
    for (matcher_id, start, end) in matches[match]: 
        if sentences[match] not in relevant_sent:
            relevant_sent.append(sentences[match]) #keep sentences with patterns
     



'''
7/9
ML model pipeline plans
Test 1.1:
    - cleaner -> strip whitespace, lowercase, lemmatize
    - feed it raw sentences
    - classifier 
Test 1.2:
    - cleaner -> strip whitespace, lowercase
    - feed it raw sentences 
    - classifier 
Test 2.1:
    - cleaner -> strip whitespace, lowercase, lemmatize
    - dependency parse sentences
    - classifier 
Test 2.2:
    - cleaner -> strip whitespace, lowercase
    - dependency parse sentences
    - classifier 
'''

'''
7/7
1. read file /
2. tokenize to sentences /
3. match for certain words & get the spans, roots /
    - permission
    - information 
    - consent
    - authorize
    - knowledge
    - share
    - receive
    - personal
    - record
    - content
    - rights
    - email
    - third-party
    - delete ?
    - purchase ?
4. take ^^^ this data -> ML model -> document score

later:
4.1 individual sentence analysis & annotation
'''
