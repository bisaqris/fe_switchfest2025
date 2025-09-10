import React from 'react';

export default function PublicFooter() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto text-center py-6 px-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} SwitchFest. Diselenggarakan oleh HMJ TI UIN Walisongo.
                </p>
            </div>
        </footer>
    );
}