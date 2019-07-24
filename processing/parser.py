from stat_parser import Parser
import re

parser = Parser()

'''
make sure this is in pyStatParser folder

WEIRD THINGS:
--> punctuation at the end of sentences messes things up
--> needs to be tested
'''

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
                # print("matched", prevpos, pos, line[prevpos:pos])
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
    
    #print(str(tree).split())
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

# converts stack (list) to string
def stack_to_string(stack):
    return " ".join(stack).strip()

def strip_space(sent):
    return re.sub(" +", " ", sent)
            
def run(sentence):
    print(parser.parse(sentence))
    print("\n")
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

        if phrase.strip() not in phrase_list:
            phrase_list.append(strip_space(phrase.strip()))

    print(phrase_list)

run("We receive and store any information")

