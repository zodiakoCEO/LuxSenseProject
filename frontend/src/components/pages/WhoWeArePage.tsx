import React from "react";
import WhoWeAreSection from "../organism/WoWeAreSection";
import DefaultLayout from "../templates/DefaultLayout";

const WhoWeArePage: React.FC = () => {
    return (
        <DefaultLayout>
            <WhoWeAreSection/>
        </DefaultLayout>
    )
}

export default WhoWeArePage