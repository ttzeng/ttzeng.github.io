import { CapacitorHttp } from "https://unpkg.com/@capacitor/core@latest/dist/index.js";
import namedIcon from "./namedIcon.js";

export default {
    // Use data() option to declare an object that represent reactive state of a component.
    // Vue calls this function when creating a new component instance, the object is then added
    // to its reactivity system to trigger reactive updates.
    data() {
        return {
            adviceOfDay: "",
            banks: [
                { title: "台灣銀行",
                  link: "https://ebank.bot.com.tw/",
                  icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Bank_of_Taiwan_Seal.svg"
                },
                { title: "台新銀行",
                  link: "https://www.taishinbank.com.tw/",
                  icon: "https://lh3.googleusercontent.com/N_Pbr8GUffsH-EwrTLQRyFWJm5_hFbNzpXleu_S52Qlj05nQPiO4DKg-z4pC81qUr44"
                },
                { title: "渣打銀行",
                  link: "https://www.sc.com/tw/",
                  icon: "https://lh3.googleusercontent.com/WMV3LAwkWD6ZltqwoJXc86EKrZYPubpSAbWFS9-KbusYpyIVkcyW3disn_0sS3qSCNji"
                },
                { title: "國泰世華",
                  link: "https://cathaybk.com.tw/cathaybk/",
                  icon: "https://scontent.ftpe7-4.fna.fbcdn.net/v/t1.18169-9/16865101_675772255943449_1600685428659784289_n.png?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=s8YyDhv_hrYAX8qMa2m&_nc_ht=scontent.ftpe7-4.fna&oh=00_AfCWXjrIi8RTq0DaQ27RVk7xLpKCQs_8PD9FkgUvOcNicg&oe=647EC447"
                },
                { title: "中國信託",
                  link: "https://www.ctbcbank.com/",
                  icon: "https://lh3.googleusercontent.com/td64BeVs2fgoyiLduaUlpZrTaIXpQSv8lcqDzWr40vDhpTTvKkT8tYqETTj7oLA7gfg"
                },
                { title: "合作金庫",
                  link: "https://www.tcb-bank.com.tw/",
                  icon: "https://my.tcb-life.com.tw/file/tcb-icon.jpg"
                },
            ],
            securities: [
                { title: "台銀證券",
                  link: "https://168.twfhcsec.com.tw/BTSWeb/WebLogin.aspx",
                  icon: "https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/54/a0/e5/54a0e5b3-8f06-bd13-0004-e7a9014b292f/AppIcon-0-1x_U007emarketing-0-0-85-220-0-5.png/246x0w.png"
                },
                { title: "華南永昌",
                  link: "https://www.entrust.com.tw/entrust/indexA.do",
                  icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTq_qieyyKGOsi3hLExq2XKbhy9lff9RHj2f-NQzvFsuOvT7Fd&usqp=CAU"
                },
                { title: "Ameritrade",
                  link: "https://www.tdameritrade.com/home.page",
                  icon: "https://i.pinimg.com/originals/69/09/d5/6909d59b7900f6a9bb45bf936b632e7f.png"
                },
                { title: "Etrade",
                  link: "https://us.etrade.com/home",
                  icon: "https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1476500866/ukg833gylj7adlryeuig.png"
                }
            ]
        }
    },
    // Register any imported components to create the tags associated with those components.
    components: {
        namedIcon
    },
    // Hooks to be called at different stages of the instance's lifecycle.
    created() {
        const getAdvice = async () => {
            const options = {
                // Advice Slip JSON API (https://api.adviceslip.com)
                url: "https://api.adviceslip.com/advice"
            };
            const response = await CapacitorHttp.get(options);
            this.adviceOfDay = JSON.parse(response.data).slip.advice;
        };
        getAdvice();
    },
    // The template of the rendered DOM to the component.
    template: /* html */`
    <div data-role="page">
        <div data-role="header">
            <div data-role="navbar">
                <ul>
                    <li><a href="#" class = "ui-btn-active">常用鍊結</a></li>
                </ul>
            </div>
        </div>
        <div role="main" class="ui-content">
            <div data-role="collapsible">
                <h1>理財</h1>
                <div class="radiusNamedGroup">
                    <span class="name">銀行</span>
                    <named-icon v-for="item in banks" :link="item.link" :icon="item.icon">{{item.title}}</named-icon>
                </div>
                <div class="radiusNamedGroup">
                    <span class="name">證券</span>
                    <named-icon v-for="item in securities" :link="item.link" :icon="item.icon">{{item.title}}</named-icon>
                </div>
            </div>
        </div>
        <div data-role="footer" data-position="fixed">
            <h3>{{ adviceOfDay }}</h3>
        </div>
    </div>`
};
