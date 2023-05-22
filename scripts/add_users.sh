#!/bin/bash

# MongoDB details
uri="mongodb+srv://daviewave:123@prompt-pioneer.drydbbr.mongodb.net/prompt-pioneer"

# Users to be added
users=("ElonMusk elonmusk@spacex.com https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" 
"MarkZuckerberg mark@facebook.com https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds" 
"ElizabethHolmes elizabeth@theranos.com https://media.npr.org/assets/img/2022/11/22/ap22320857040398_sq-98010f9a8e995fad7af330f9b4b4ce3b8f503b5a-s800-c85.jpg" 
"BillyMcFarland billy@fyrefestival.com https://i.insider.com/607a04a174da0300181e245d?width=1136&format=jpeg" 
"JordanBelfort jordan@wallstreet.com https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1492203929/articles/2013/12/20/the-real-wolf-of-wall-street-jordan-belfort-s-vulgar-memoirs/131219-so-real-wolf-tease_tuckzb")

# Loop through the users and add them to the database
for user in "${users[@]}"; do
    clear
    user_details=($user)
    username=${user_details[0]}
    email=${user_details[1]}
    image=${user_details[2]}
    version=1

    echo "Adding user $username with email $email to the database..."
    mongo $uri --eval 'db.users.insertOne({ username: "'$username'", email: "'$email'", image: "'$image'", __v: '$version'})' && echo "User $username successfully added!" || echo "Failed to add user $username."
done
