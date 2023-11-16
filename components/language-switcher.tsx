import { useRouter } from 'next/router';
import {useTranslation} from "next-i18next";
import {Select, SelectItem} from "@nextui-org/react";
import {ChangeEvent} from "react";

export default function LanguageSwitcher() {
    const router = useRouter()
    const {i18n} = useTranslation();

    const handleLocaleChange = (e:ChangeEvent<any>) => {
        void router.push(
            {
                pathname: router.pathname,
                query: router.query,
            },
            undefined,
            { locale: e.target.value }
        )
    }
    return (
        <div className="w-full md:w-40">
            <Select
                value={i18n.language}
                onChange={handleLocaleChange}
                label={i18n.language === "en" ? "Language" : "Мова"}
            >
                <SelectItem key={"en"} value='en'>English</SelectItem>
                <SelectItem key={"ua"} value='ua'>Українська</SelectItem>
            </Select>
        </div>
    );
}