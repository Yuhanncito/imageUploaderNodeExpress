import cloudinary from "../configs/cloudinaty.config";
import fs from 'fs';
import path from "path";

export const uploadPhoto = async (req, res) => {
    try {
        const {image} = req.body

        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const extension = image.substring("data:image/".length, image.indexOf(";base64"));
        const imagePathUrl = `${Date.now()}.${extension}`;
        const filePath = path.join(__dirname, `../../public/images/${imagePathUrl}`);
        const imageBuffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(filePath, imageBuffer);

         
        const host = req.get('host');
        res.status(200).json({status: 'ok', photoUrl: `http://${host}/images/${imagePathUrl}`})
    }catch(err){
        res.status(500).json({message: err.message})
    }
}


/*(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dhuutno2p', 
        api_key: '425469662671216', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();*/