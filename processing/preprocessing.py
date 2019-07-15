import spacy 
from spacy.lang.en import English
from spacy.matcher import Matcher

from sklearn.pipeline import Pipeline
from sklearn.svm import LinearSVC
from sklearn.feature_extraction.text import CountVectorizer 
from sklearn.base import TransformerMixin 

def readFile(path):
    with open(path, "rt") as f:
        return f.read()

def writeFile(path, contents):
    with open(path, "wt") as f:
        f.write(contents)

#nlp = spacy.load("en_core_web_md") 
# text = readFile("facebook_tos.txt") #testing on fb tos

def preprocess(path):
    nlp = spacy.load("en_core_web_md") 
    text = readFile(path).strip().lower()
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
                
    return relevant_sent

#this is only useful for training and testing, preprocessing will take care of this for imported policies
def clean(text):
    return text.strip().lower()
    
classifier = LinearSVC()

parser = English()
## 1 -> pipeline: clean, lemmatize, classify w/ CountVectorizer

class predictors(TransformerMixin):
    def transform(self, X, **transform_params):
        return [clean(text) for text in X]
    def fit(self, X, y=None, **fit_params):
        return self
    #unnecessary 
    def get_params(self, deep=True):
        return {}
    

def spacy_tokenizer(sentence):
    tokens = parser(sentence)
    tokens = [tok.lemma_.lower().strip() if tok.lemma_ != "-PRON-" else tok.lower_ for tok in tokens]
    #tokens = [tok for tok in tokens if (tok not in stopwords and tok not in punctuations)]    
    return tokens

vectorizer = CountVectorizer(tokenizer = spacy_tokenizer, ngram_range=(1,1))#unnecessary

pipe = Pipeline([("clean", predictors()),("vectorizer",vectorizer),("classifier", classifier)])

train = [("The types of information we collect depend on how you use our Products.", "neutral"),
("You can learn how to access and delete information we collect by visiting the Facebook Settings and Instagram Settings.", "positive"),
("We collect the content, communications and other information you provide when you use our Products, including when you sign up for an account, create or share content, and message or communicate with others.", "negative"),
("It can also include what you see through features we provide, such as our camera, so we can do things like suggest masks and filters that you might like, or give you tips on using camera formats.", "negative"),
("Our systems automatically process content and communications you and others provide to analyze context and what's in them for the purposes described below.", "negative"),
("Learn more about how you can control who can see the things you share.", "positive"),
(" You can choose to provide information in your Facebook profile fields or Life Events about your religious views, political views, who you are \"interested in,\" or your health.", "positive"),
("This and other information (such as racial or ethnic origin, philosophical beliefs or trade union membership) could be subject to special protections under the laws of your country", "neutral"),
(" We collect information about the people, Pages, accounts, hashtags and groups you are connected to and how you interact with them across our Products, such as people you communicate with the most or groups you are part of.", "negative"),
("We also collect contact information if you choose to upload, sync or import it from a device (such as an address book or call log or SMS log history), which we use for things like helping you and others find people you may know and for the other purposes listed below.","negative"),
("We collect information about how you use our Products, such as the types of content you view or engage with; the features you use; the actions you take; the people or accounts you interact with; and the time, frequency and duration of your activities.","negative"),
("For example, we log when you're using and have last used our Products, and what posts, videos and other content you view on our Products.", "negative"),
("We also collect information about how you use features like our camera.", "strong negative"),
("If you use our Products for purchases or other financial transactions (such as when you make a purchase in a game or make a donation), we collect information about the purchase or transaction.", "neutral"),
("We also receive and analyze content, communications and information that other people provide when they use our Products.", "negative"),
("For example, we use information collected about your use of our Products on your phone to better personalize the content (including ads) or features you see when you use our Products on another device, such as your laptop or tablet, or to measure whether you took an action in response to an ad we showed you on your phone on a different device.", "negative"),
("Advertisers, app developers, and publishers can send us information through Facebook Business Tools they use, including our social plug-ins (such as the Like button), Facebook Login, our APIs and SDKs, or the Facebook pixel.", "negative"),
(" We also receive information about your online and offline actions and purchases from third-party data providers who have the rights to provide us with your information.", "strong negative"),
("Partners receive your data when you visit or use their services or through third parties they work with.", "negative"),
("We require each of these partners to have lawful rights to collect, use and share your data before providing any data to us.", "positive"),
("We use the information we have to deliver our Products, including to personalize features and content (including your News Feed, Instagram Feed, Instagram Stories and ads) and make suggestions for you (such as groups or events you may be interested in or topics you may want to follow) on and off our Products.", "neutral"),
("To create personalized Products that are unique and relevant to you, we use your connections, preferences, interests and activities based on the data we collect and learn from you and others (including any data with special protections you choose to provide); how you use and interact with our Products; and the people, places, or things you're connected to and interested in on and off our Products.", "neutral"), 
("We use location-related information-such as your current location, where you live, the places you like to go, and the businesses and people you're near-to provide, personalize and improve our Products, including ads, for you and others.", "negative"), 
("if you've allowed us to collect it", "strong positive"),
(" If you have it turned on,", "strong positive"), 
("We use the information we have (including your activity off our Products, such as the websites you visit and ads you see) to help advertisers and other partners measure the effectiveness and distribution of their ads and services, and understand the types of people who use their services and how people interact with their websites, apps, and services.", "negative"),
("We use the information we have to verify accounts and activity, combat harmful conduct, detect and prevent spam and other bad experiences, maintain the integrity of our Products, and promote safety and security on and off of Facebook Products.","positive"),
("We use the information we have to send you marketing communications, communicate with you about our Products, and let you know about our policies and terms.","positive"),
("We also use your information to respond to you when you contact us.", "neutral"), 
("We use the information we have (including from research partners we collaborate with) to conduct and support research and innovation on topics of general social welfare, technological advancement, public interest, health and well-being.", "neutral"),
("When you share and communicate using our Products, you choose the audience for what you share.", "strong positive"), 
("Public information can also be seen, accessed, reshared or downloaded through third-party services such as search engines, APIs, and offline media such as TV, and by apps, websites and other services that integrate with our Products.", "negative"),
("You should consider who you choose to share with, because people who can see your activity on our Products can choose to share it with others on and off our Products, including people and businesses outside the audience you shared with.", "neutral"), 
("If you are uncomfortable with what others have shared about you on our Products, you can learn how to report the content.", "positive"),
("When you choose to use third-party apps, websites, or other services that use, or are integrated with, our Products, they can receive information about what you post or share.", "negative"),
("We are in the process of restricting developers’ data access even further to help prevent abuse.", "neutral"),
("We work with third-party partners who help us provide and improve our Products or who use Facebook Business Tools to grow their businesses, which makes it possible to operate our companies and provide free services to people around the world.","neutral"),
("We don't sell any of your information to anyone, and we never will.","strong positive"),
("We also impose strict restrictions on how our partners can use and disclose the data we provide.","strong positive")]
 

test = [("We provide aggregated statistics and insights that help people and businesses understand how people are engaging with their posts, listings, Pages, videos and other content on and off the Facebook Products.","neutral"),
("We provide advertisers with reports about the kinds of people seeing their ads and how their ads are performing, but we don't share information that personally identifies you (information such as your name or email address that by itself can be used to contact you or identifies who you are) unless you give us permission.","positive"),
("We share information about you with companies that aggregate it to provide analytics and measurement reports to our partners.","neutral"),
("We provide information and content to vendors and service providers who support our business, such as by providing technical infrastructure services, analyzing how our Products are used, providing customer service, facilitating payments or conducting surveys.","neutral"),
("We also provide information and content to research partners and academics to conduct research that advances scholarship and innovation that support our business or mission, and enhances discovery and innovation on topics of general social welfare, technological advancement, public interest, health and well-being.","neutral"),
("We share information with law enforcement or in response to legal requests in the circumstances outlined below.", "negative"),
("We store data until it is no longer necessary to provide our services and Facebook Products, or until your account is deleted - whichever comes first.", "negative"),
("When you delete your account, we delete things you have posted, such as your photos and status updates, and you won't be able to recover that information later.","positive"),
("Information that others have shared about you isn't part of your account and won't be deleted.","neutral"),
("We'll notify you before we make changes to this policy and give you the opportunity to review the revised policy before you choose to continue using our Products.", "strong positive"),
("Information we receive about you (including financial transaction data related to purchases made with Facebook) can be accessed and preserved for an extended period when it is the subject of a legal request or obligation, governmental investigation, or investigations of possible violations of our terms or policies, or otherwise to prevent harm.","neutral"),
("We also retain information from accounts disabled for terms violations for at least a year to prevent repeat abuse or other term violations.", "neutral")]


pipe.fit([x[0] for x in train], [x[1] for x in train])
predicted = pipe.predict([x[0] for x in test])

for i in range(len(test)):
    print(test[i], predicted[i])

