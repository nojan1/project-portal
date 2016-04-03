class Note(object):
    def __init__(self, blob):
        self.noteId = blob.name.replace(" ", "-")
        self.noteName = blob.name
        self.noteContents = blob.data_stream.read().decode("utf-8")