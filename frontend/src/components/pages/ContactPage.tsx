import React from "react";
import ContactSection from "../organism/ContactSection";
import DefaultLayout from "../templates/DefaultLayout";

const ContactPage: React.FC = () => {
    return (
        <DefaultLayout>
            <ContactSection/>
        </DefaultLayout>
    )
}

export default ContactPage
