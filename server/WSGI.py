from app import main

def application(env):
	main(False)
    
if __name__ == "__main__":
    import os
    application(os.environ)