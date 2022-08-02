import { Card } from '@material-ui/core'
import React, { useState } from 'react'

const myData = [
    { question: "Who is a True-fan?", ans: "A True-fan is a true believer in the creator's work. A True-fan wants to invest in the creator and would often want to share endorsement and financial support in the form of Thinkly stars." },
    { question: "How does monetization with Thinkly work?", ans: "Thinkly allows True-fans to support creators by thanking them with Thinkly stars. Stars can be bought easily using the Thinkly payment gateway and gets credited to the creator's reward store instantly." },
    { question: "How much money can True-fans support with, monthly?", ans: "While, we dont have any limit - a good idea will be to begin with whatever you are comfortable with. Most of our True-fans would typically support their favorite creators with INR 200-1000 from time to time." },
    { question: "What are the options to pay?", ans: "The Thinkly payment options are flexible, You can do a bank transfer, use your credit or debit card - or easiest of all, just simply use UPI with google pay, phonepay etc" },
    { question: "Can I support multiple creators?", ans: "Of course you can. The world of tomorrow gets better with independent creators rising and flourishing. The creator economy needs you." },
    { question: "What is the proof that the money reached the content-creator?", ans: "You will get a personalized thank you from the creator(s) , each time you thank them with Thinkly Stars." },
    { question: "Where do I reach out for support?", ans: "We are available 24/7 and across 365 days with our friendly email support. Write to us at stars@thinkly.me and one of us would reach out to you asap." },
]

const Faq = () => {
    const [faq, setfaq] = useState(myData)

    return (<div className='row'>
        <div className='col-12'>
            <p className='font-weight-bold fs-30'> FAQs</p>
            {faq.map((obj) => {
                return (<Card className='mb-4' style={{ boxShadow: 'none' }}>
                    <p className='fw-bold fs-20'>{obj.question}</p>
                    <p className='fs-18'>{obj.ans}</p>
                </Card>)
            })}
        </div>
    </div>)
}

export default Faq