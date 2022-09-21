import express from 'express'
import cors from 'cors'

import { Ad, PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minute'
import { converMinuteToHourString } from './utils/convert-minute-to-hour-string'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
})

/**
 *Query: ....
 *Route: ...
 *Body: ....
  */

// HTTP methods / API RESTful / HTTP Codes ("eles mostram se a resposta é valida, se deu certo ou não , e o tipo de resposta ")

app.get('/games', async (request, response) =>{
    const games = await prisma.game.findMany({
        include: {
          _count: {
            select: {
                Ads: true,
            }
          }
        }
    })

    return response.json([games])
})

app.post('/games/:id/ads', async (request, response) =>{
    const gameId = request.params.id;
    const body = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId, 
            name: body.name,
            yearsPlaying: body.yearsPlaying, 
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart) ,
            hourEnd: convertHourStringToMinutes(body.hourEnd) ,
            useVoiceChannel: body.useVoiceChannel,
        }
    })

   

    return response.status(201).json(ad)
})

app.get('/games/:id/ads', async (request, response)=>{
    const gameId = request.params.id;
    
   // return response.send(gameId);

   const ads = await prisma.ad.findMany({
    select: {
         id: true, 
         name: true, 
         weekDays: true, 
         useVoiceChannel: true,
         yearsPlaying: true, 
         hourStart: true, 
         hourEnd: true, 
    },
    where: {
         gameId,
    }, 
    orderBy: {
        createAt: 'desc',
    }
   })

    return response.json(ads.map((ad) =>{
        return {
            ...ad, 
            weekDays: ad.weekDays.split(','),
            hourStart: converMinuteToHourString(ad.hourStart),
            hourEnd: converMinuteToHourString(ad.hourEnd)
        }
    }))
})



app.get('/ads/:id/discord', async (request, response)=>{
    //const adId = request.params.id;
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        
        select: {
            discord:true,
        },
        where: {
            id: adId
        }
    })

    return response.json({
        discord: ad.discord,
})
})

app.listen(3333)