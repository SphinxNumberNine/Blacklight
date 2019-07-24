from stat_parser import Parser

parser = Parser()

#print (parser.parse("The information, we learn from customers helps us personalize and continually improve your Amazon experience."))

#print (str(parser.parse("We receive and store any information")).split())



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

def phrase(stack, l_paren = 0, all_phrases = []):
    phra = ""
    if stack == []:
        return 
    for i in range(len(stack)):
        if stack[i] == "(":
            l_paren += 1
        elif stack[i] == ")":
            l_paren -= 1
            if phra not in all_phrases:
                print(phra)
                all_phrases.append(phra)
            if phra != "": 
                phrase(stack[i:], l_paren, all_phrases)
        else:
            phra = phra + stack[i] + " " 
    return(all_phrases)
            
def run(sentence):
    #print(parser.parse(sentence))
    stack = create_stack(parser.parse(sentence))
    print(phrase(stack))
run("We receive and store any information")
 
        


    
