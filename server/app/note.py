class Note(object):
    def __init__(self, blob):
        self.noteName = blob.name
        self.noteContents = blob.data_stream.read()