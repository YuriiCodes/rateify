// components/LanguageSwitcher.jsx

import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
    const router = useRouter();
    const isUa = router.pathname.includes('/ua/');
    // check if there's no /ua/ in the pathname:

    return (
        <div>
            <select onChange={(e) =>
                router.push(
                    {
                        pathname: router.pathname,
                        query: router.query,
                    },
                    undefined,
                    { locale: e.target.value }
                )
            }
            >
                <option value='en'>English</option>
                <option selected={isUa} value='ua'>Українська</option>
            </select>
        </div>
    );
}