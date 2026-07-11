import Url from "../models/Url.js";
import shortid from "shortid";

export const shortenUrl = async(req, res) =>{

try{  

  console.log(req.body);   
  
  const { originalUrl } = req.body;

  const shortCode = shortid.generate();

  const newUrl = new Url({
    originalUrl,
    shortCode,
  });
  await newUrl.save();
  

  console.log(shortCode);
  
  res.json({
    success: true,
    originalUrl,
    shortCode,
  });


}
  
  catch(error){
  console.log(error);

  res.status(500).json({
    message:"Internal Server Error"
  });
  
  } 
  
}; 

export const redirectUrl = async(req, res) =>{
  try{
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if(!url){
      return res.status(404).json({
        message: "Short Url not found"
      });
    }

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);

  } catch(error){
    res.status(500).json({
      message:error.message
    });
  }

};
  
export const getAnalytics = async(req, res) =>{

  const { shortCode} = req.params;

  const Url = await Url.findOne({shortCode});

  if(!url){
  return res.status(404).json({
  message : "Short URL not found"
    });

  }

};