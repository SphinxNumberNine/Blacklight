import spacy
import nltk
import string
from spacy.lang.en import English
from nltk import RecursiveDescentParser

assign = """
S -> NP VP
VP -> V NP | V NP PP
PP -> P NP
"""

nlp = spacy.load("en_core_web_sm")

sent = "The information we learn from customers helps us personalize and continually improve your Amazon experience"

tokens = nlp(sent)

grammar_dict = dict()
for tok in tokens:
    if str(tok) not in string.punctuation:
        str_tag = str(tok.tag_)
        if ((str_tag)[-1]) == "$":
            grammar_dict[str_tag[:len(str_tag)-1]] = []
        else:
            grammar_dict[tok.tag_] = []
for tok in tokens:
    if str(tok) not in string.punctuation:
        str_tag = str(tok.tag_)
        if ((str_tag)[-1]) == "$":
            grammar_dict[str_tag[:len(str_tag)-1]].append(str(tok))
        else:
            grammar_dict[tok.tag_].append(str(tok))

for tags in grammar_dict:
    add = tags + " -> "
    for word_i in range(len(grammar_dict[tags])):
        if word_i == len(grammar_dict[tags]) - 1:
            add += "\"" + grammar_dict[tags][word_i] + "\"" + "\n"
        else:
            add += "\"" + grammar_dict[tags][word_i] + "\" | "
    assign += add

print(assign.strip())

grammar = nltk.CFG.fromstring(assign)

sent = sent.split()

rd_parser = nltk.RecursiveDescentParser(grammar)

for tree in rd_parser.parse(sent):
    print(tree)