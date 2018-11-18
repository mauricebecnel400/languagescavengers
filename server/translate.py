import goslate

text = input("Input a spanish word")
gs = goslate.Goslate()
translated = gs.translate(text,"en")
print(translated)

