import {Skeleton} from "@nextui-org/react";

export const UniversalInputLoading = () => {
    return <div className={"flex gap-4 w-full my-1"}>
        <Skeleton className={"w-4/5 rounded-lg"}>
            <div className="h-20   bg-default-200"></div>
        </Skeleton>
        <Skeleton className={"w-4/5 rounded-lg"}>
            <div className="h-20   bg-default-200"></div>
        </Skeleton>
    </div>
}