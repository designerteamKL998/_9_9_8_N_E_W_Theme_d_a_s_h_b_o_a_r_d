   const announcementData = {

            welcome: {

                image:
                    "imgs/assets/announce-001b.jpg",

                tag:
                    "System",

                tagClass:
                    "system",

                date:
                    "25 Sep 2026",

                title:
                    "Welcome to Our New Platform!",

                description:
                    "We are excited to announce the official launch of our new platform! Enjoy a better gaming experience with more exciting features, smoother performance and exclusive rewards just for you.",

                highlight:
                    "What's New?",

                list: [

                    "New and improved user interface",

                    "More promotions and events",

                    "Enhanced security for a safer experience",

                    "Exclusive rewards for all members"

                ]

            },


            reward: {

                image:
                    "imgs/assets/announce-002b.jpg",

                tag:
                    "Promotion",

                tagClass:
                    "promotion",

                date:
                    "22 Sep 2026",

                title:
                    "Daily Check-in Rewards",

                description:
                    "Don't miss your daily rewards! Log in every day and collect exciting rewards. The more consistently you check in, the more rewards you can unlock.",

                highlight:
                    "Daily Rewards",

                list: [

                    "Check in every day",

                    "Claim your daily reward",

                    "Build your check-in streak",

                    "Unlock more exciting rewards"

                ]

            }

        };


        const announcementItems =
            document.querySelectorAll(".announcement-item");


        announcementItems.forEach(item => {

            item.addEventListener("click", () => {

                const id =
                    item.dataset.announcement;

                const data =
                    announcementData[id];


                /* ACTIVE ITEM */

                announcementItems.forEach(item => {

                    item.classList.remove("active");

                });

                item.classList.add("active");


                /* IMAGE */

                document.getElementById(
                    "announcementDetailImage"
                ).src = data.image;


                /* TAG */

                const tag =
                    document.getElementById(
                        "announcementDetailTag"
                    );

                tag.textContent = data.tag;

                tag.className =
                    "announcement-tag " + data.tagClass;


                /* DATE */

                document.getElementById(
                    "announcementDetailDate"
                ).textContent = data.date;


                /* TITLE */

                document.getElementById(
                    "announcementDetailTitle"
                ).textContent = data.title;


                /* DESCRIPTION */

                document.getElementById(
                    "announcementDetailDescription"
                ).textContent = data.description;


                /* HIGHLIGHT TITLE */

                document.getElementById(
                    "announcementHighlightTitle"
                ).textContent = data.highlight;


                /* LIST */

                const list =
                    document.getElementById(
                        "announcementHighlightList"
                    );

                list.innerHTML = "";


                data.list.forEach(text => {

                    const li =
                        document.createElement("li");

                    li.textContent = text;

                    list.appendChild(li);

                });

            });

        });