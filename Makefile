BUILD_NAME = iitj_tree
GIT_COMMIT=$(git log -1 --pretty=format:%h)
name= "2"


say_hello:
	@echo "hel world"
	git log -1
	@echo "this is all the commit ${GIT_COMMIT}"
	echo "Hello, ${name}!"
