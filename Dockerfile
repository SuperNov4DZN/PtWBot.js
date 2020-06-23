# Node image
FROM node:lts
# Work directory
WORKDIR usr/src/app
# Instaling ffmpeg
RUN apt-get update || : && apt-get install python -y
RUN apt-get install ffmpeg -y
# Installing packages
COPY package*.json ./
RUN npm install
# Copying the source code
COPY . .
# Running bot.js
CMD ["node", "bot.js"]