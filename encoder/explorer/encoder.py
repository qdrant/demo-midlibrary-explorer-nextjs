import torch
from PIL import Image
from sentence_transformers import SentenceTransformer


torch.set_num_threads(1)


class ParallelEncoder:

    model = None

    @classmethod
    def encode(cls, image_path):
        if cls.model is None:
            cls.model = SentenceTransformer('clip-ViT-L-14')

        embedding = cls.model.encode(Image.open(image_path))

        return embedding
