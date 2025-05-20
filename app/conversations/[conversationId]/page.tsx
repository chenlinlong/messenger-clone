
import getMessages from "@/app/actions/getMessages";
import EmptyState from './../../components/EmptyState';
import Form from "./components/Form";
import Body from "./components/Body";
import Header from "./components/Header";
import getConversationById from "@/app/actions/getConversationById";

interface IParams {
    conversationId: string;
}

export default async function ConversationPageId({ params }: { params: Promise<IParams> }) {

    const paramsInfo = await params;
    const conversation = await getConversationById(paramsInfo.conversationId);
    const messages = await getMessages(paramsInfo.conversationId);
    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
    }

    return (
        <div className="lg:pl-80 h-full" >
            <div className="h-full flex flex-col">
                <Header conversation={conversation}></Header>
                <Body></Body>
                <Form></Form>
            </div>
        </div>
    )
}
