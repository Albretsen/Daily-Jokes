import ScreenView from "../components/layout/ScreenView";
import ContentBox from "../components/layout/ContentBox";
import NotificationListManager from "../components/managers/NotificationListManager";
import ScrollToTopView from "../components/layout/ScrollToTopView";

export default function Notifications() {
    return (
        <ScreenView style={{ justifyContent: "flex-start" }}>
            <ContentBox title="Latest notifications">
                <ScrollToTopView>
                    <NotificationListManager initialCriteria={{ sortBy: "-createdAt" }} />
                </ScrollToTopView>
            </ContentBox>
        </ScreenView>
    )
}