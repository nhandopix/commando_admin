#/bin/bash

function version_gt() {
    test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1";
}

CUR_RELEASE=$(git branch -a --list origin/releases/* | tail -n 1)
TMP=(${CUR_RELEASE//\/v/ })
CUR_RELEASE_VER="0.0.0"
if [ "${#TMP[@]}" -gt 0 ]; then
    # if bash greater than 4.0
    if version_gt $BASH_VERSION "4.0"; then
        CUR_RELEASE_VER=${TMP[-1]}
    else
        CUR_RELEASE_VER=${TMP[${#TMP[@]}-1]}
    fi
fi
#Detect current release version and parse it
VERSIONS=(${CUR_RELEASE_VER//./ })
MAJOR=${VERSIONS[0]}
MINOR=${VERSIONS[1]}
PATCH=${VERSIONS[2]}

#Calculate new version number
MAJOR=$(($MAJOR + 0)) #Convert to number
MINOR=$(($MINOR + 1)) #Convert to number and add 1
PATCH=$(($PATCH + 0)) #Convert to number

echo "$MAJOR.$MINOR.$PATCH"
