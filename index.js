{\rtf1\ansi\ansicpg874\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww12720\viewh7800\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 mport fetch from "node-fetch";\
\
export default async function handler(req, res) \{\
  try \{\
    const \{ q, limit \} = req.query;\
\
    if (!q) \{\
      return res.status(400).json(\{ error: "Missing required query parameter: q" \});\
    \}\
\
    const FB_TOKEN = process.env.FB_TOKEN;\
    if (!FB_TOKEN) \{\
      return res.status(500).json(\{ error: "FB_TOKEN is not set in environment variables" \});\
    \}\
\
    const resultLimit = limit ? parseInt(limit, 10) : 10;\
\
    const url = `https://graph.facebook.com/v19.0/search?type=adinterest&q=$\{encodeURIComponent(\
      q\
    )\}&limit=$\{resultLimit\}&access_token=$\{FB_TOKEN\}`;\
\
    const fbResponse = await fetch(url);\
    const data = await fbResponse.json();\
\
    if (data.error) \{\
      return res.status(400).json(\{ error: data.error \});\
    \}\
\
    return res.status(200).json(data);\
  \} catch (err) \{\
    return res.status(500).json(\{ error: err.message \});\
  \}\
\}}