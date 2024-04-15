from re import finditer
import os

# Renames files in the same directory
# Needed to rename image files from old format "boxRotateBelowX.png" to "box-rotate-below-x.png"

# https://stackoverflow.com/a/29920015/23556726
def camel_case_split(identifier):
    matches = finditer('.+?(?:(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|$)', identifier)
    return [m.group(0) for m in matches]


def convertFileName(filename):
    camelCase = camel_case_split(filename)
    splitLast = camelCase[-1].split(".")

    camelCase[-1] = splitLast[0]
    fileExtension = splitLast[1]

    newFormat = "-".join(map(lambda s: s.lower(), camelCase))
    return newFormat + "." + fileExtension


def filterFunc(fileName):
    if fileName[-3:] == "png":
        return True
    return False

def getPNGs():
    fileNameList = os.listdir(".")
    filtered = filter(filterFunc, fileNameList)
    return list(filtered)


def convertImages():
    filesToConvert = getPNGs()

    for f in filesToConvert:
        os.rename(f, convertFileName(f))


convertImages()

