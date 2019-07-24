from stat_parser import Parser
import re
import string

## make sure this is in pyStatParser folder
parser = Parser()


# https://stackoverflow.com/questions/5454322/python-how-to-match-nested-parentheses-with-regex
# uses regex to find grouping of parentheses
def matches(line, opendelim='(', closedelim=')'):
    stack = []

    for m in re.finditer(r'[{}{}]'.format(opendelim, closedelim), line):
        pos = m.start()

        if line[pos-1] == '\\':
            # skip escape sequence
            continue

        c = line[pos]

        if c == opendelim:
            stack.append(pos+1)

        elif c == closedelim:
            if len(stack) > 0:
                prevpos = stack.pop()
                yield (prevpos, pos, len(stack))
            else:
                # error
                print("encountered extraneous closing quote at pos {}: '{}'".format(pos, line[pos:] ))
                pass

    if len(stack) > 0:
        for pos in stack:
            print("expecting closing quote to match open quote starting at: '{}'"
                  .format(line[pos-1:]))

# creates stack to organize phrases and removes POS tag
def create_stack(tree):
    stack = []
    space = False
    
    for part in str(tree).split():
        if part[0] == "(":
            stack.append("(")
        else:
            count = 0
            word = ""
            for char in part:
                if char != ")":
                    word += char
                else:
                    count += 1
            stack.append(word)
            for paren in range(count):
                stack.append(")")

    return stack

# converts stack contents to string
def stack_to_string(stack):
    return " ".join(stack).strip()

def strip_space(sent):
    return re.sub(" +", " ", sent)
            
def run(sentence):
    if sentence[-1] in string.punctuation:
        sentence = sentence[:-1]   #remove ending punctuation
        if sentence == "":
            return
    
    #print(parser.parse(sentence))
    #print("\n")

    stack = create_stack(parser.parse(sentence)) 
    sent = stack_to_string(stack)

    phrase_list = []

    # every phrase
    for openpos, closepos, level in matches(sent):
        # cleaning up string
        phrase = sent[openpos:closepos]
        phrase = phrase.replace('(','')
        phrase = phrase.replace(')','')
        phrase = phrase[:-1]
        phrase = strip_space(phrase.strip())

        if phrase not in phrase_list:
            phrase_list.append(phrase)

    #print(phrase_list)
    return phrase_list
    
'''
run("We receive and store any information.")
run("We don't recieve and store any information") 
    # --> include that "n't" and "not" are identical
run("We do not recieve and store any information")
'''

#112
def readFile(path):
    with open(path, "rt") as f:
        return f.read()

#112
def writeFile(path, contents):
    with open(path, "wt") as f:
        f.write(contents)

#https://stackoverflow.com/questions/4576077/python-split-text-on-sentences
#splits document into sentences
alphabets= "([A-Za-z])"
prefixes = "(Mr|St|Mrs|Ms|Dr)[.]"
suffixes = "(Inc|Ltd|Jr|Sr|Co)"
starters = "(Mr|Mrs|Ms|Dr|He\s|She\s|It\s|They\s|Their\s|Our\s|We\s|But\s|However\s|That\s|This\s|Wherever)"
acronyms = "([A-Z][.][A-Z][.](?:[A-Z][.])?)"
websites = "[.](com|net|org|io|gov)"

def split_into_sentences(text):
    text = " " + text + "  "
    text = text.replace("\n"," ")
    text = re.sub(prefixes,"\\1<prd>",text)
    text = re.sub(websites,"<prd>\\1",text)
    if "Ph.D" in text: text = text.replace("Ph.D.","Ph<prd>D<prd>")
    text = re.sub("\s" + alphabets + "[.] "," \\1<prd> ",text)
    text = re.sub(acronyms+" "+starters,"\\1<stop> \\2",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>\\3<prd>",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>",text)
    text = re.sub(" "+suffixes+"[.] "+starters," \\1<stop> \\2",text)
    text = re.sub(" "+suffixes+"[.]"," \\1<prd>",text)
    text = re.sub(" " + alphabets + "[.]"," \\1<prd>",text)
    if "”" in text: text = text.replace(".”","”.")
    if "\"" in text: text = text.replace(".\"","\".")
    if "!" in text: text = text.replace("!\"","\"!")
    if "?" in text: text = text.replace("?\"","\"?")
    text = text.replace(".",".<stop>")
    text = text.replace("?","?<stop>")
    text = text.replace("!","!<stop>")
    text = text.replace("<prd>",".")
    sentences = text.split("<stop>")
    sentences = sentences[:-1]
    sentences = [s.strip() for s in sentences]
    return sentences

#reads file and parses all sentences
def parse_all(path):
    tos = readFile(path)
    
    #edit file to make it readable for parser
    #this needs some customization depending on the text format
    tos = tos.replace("\n",". ")
    tos = tos.replace("(", "[")
    tos = tos.replace(")", "]")
    tos = tos.replace(":\n", ".")
    tos = tos.replace(":",",")
    
    phrase_list = []
    for sentence in split_into_sentences(tos):
        print(sentence)
        phrase_list += run(sentence)
    
    return (set(phrase_list))

print(parse_all("facebook_tos.txt"))
