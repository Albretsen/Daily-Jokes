import ScreenView from "../../components/layout/ScreenView";
import Jokes from "./Jokes";
import Contests from "./Contests";
import ContentTab from "../../components/layout/ContentTab";

export default function Browse() {

    return (
        <ScreenView scrollView={false} style={{ justifyContent: "flex-start" }}>
            <ContentTab
                contentSpacing={10}
                tabs={[
                    {
                        name: "Jokes",
                        component: <Jokes />
                    },
                    {
                        name: "Contests",
                        component: <Contests />
                    },
                ]}
            />
        </ScreenView>
    )
}