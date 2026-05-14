import sys
import torch
from diffusers import StableDiffusionPipeline, AutoencoderKL, UNet2DConditionModel, DDPMScheduler
from transformers import BertTokenizer, BertModel
from PIL import Image
import pandas as pd
import os
import time

device = "cuda:1"
model_lora_path = "/media/dl-d/Data/dl-d/pyfiles/diffusers/examples/text_to_image/sd-pokemon-model-lora-15.0"
base_model_path = "/media/dl-d/Data/dl-d/pyfiles/ttidataset/stable-diffusion-v1-5"
taiyi_model_path = "/media/dl-d/Data/dl-d/pyfiles/ttidataset/Taiyi-Stable-Diffusion-1B-Chinese-v0.1"
output_dir = "./testimages15"
os.makedirs(output_dir, exist_ok=True)

vae = AutoencoderKL.from_pretrained(base_model_path, subfolder="vae", torch_dtype=torch.float16).to(device)
unet = UNet2DConditionModel.from_pretrained(base_model_path, subfolder="unet", torch_dtype=torch.float16)
unet.load_attn_procs(model_lora_path)
unet.to(device)
scheduler = DDPMScheduler.from_pretrained(base_model_path, subfolder="scheduler")
tokenizer = BertTokenizer.from_pretrained(taiyi_model_path, subfolder="tokenizer")
text_encoder = BertModel.from_pretrained(taiyi_model_path, subfolder="text_encoder", torch_dtype=torch.float16).to(device)

pipeline = StableDiffusionPipeline(vae=vae, text_encoder=text_encoder, tokenizer=tokenizer, unet=unet, scheduler=scheduler, safety_checker=None, feature_extractor=None, requires_safety_checker=False).to(device)

def encode_prompt(prompt, tokenizer, text_encoder, device, num_images=1, do_cfg=True):
    inputs = tokenizer(prompt, padding="max_length", max_length=256, truncation=True, return_tensors="pt").to(device)
    with torch.no_grad():
        embeds = text_encoder(inputs.input_ids)[0]
    embeds = embeds.repeat(num_images, 1, 1)
    if do_cfg:
        uncond_inputs = tokenizer("", padding="max_length", max_length=256, truncation=True, return_tensors="pt").to(device)
        with torch.no_grad():
            uncond_embeds = text_encoder(uncond_inputs.input_ids)[0]
        uncond_embeds = uncond_embeds.repeat(num_images, 1, 1)
    else:
        uncond_embeds = None
    return embeds, uncond_embeds

# 提示：实际后端接口应接收前端传来的这四个字段
def generate_image_from_api(history, content, mood, poem, image_name="output.png"):
    prompt = f"{history} {content} {mood} {poem}".strip()
    w, h = 768, 768
    prompt_embeds, negative_embeds = encode_prompt(prompt, tokenizer, text_encoder, device)
    with torch.inference_mode():
        image = pipeline(prompt_embeds=prompt_embeds, negative_prompt_embeds=negative_embeds, width=w, height=h, num_inference_steps=30, guidance_scale=7.5).images[0]
    image.save(os.path.join(output_dir, image_name))
    return os.path.join(output_dir, image_name)
