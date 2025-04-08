export default function PrivacyPolicyPage() {
    return (
        <div className="mx-20 my-10 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h2 className="font-title text-4xl font-bold">Privacy Policy for Vessle</h2>

                <p className="text-secondary"><strong>Last updated:</strong> 2025/04/08</p>
            </div>

            <p>
                Vessle is committed to protecting your privacy. Your Personal Information is used only for
                providing and improving the Site. By using the Site, you agree to the collection and use of
                information in accordance with this policy.
            </p>
            <div>
                <h3 className="font-title text-2xl font-bold">Information Collection and Use</h3>
                <p>
                    While using our Site, Vessle may ask you to provide us with certain personally-identifiable
                    information that can be used to contact or identify you. Personally-identifiable information
                    may include, but is not limited to, your email.
                </p>
            </div>

            <div>
                <h3 className="font-title text-2xl font-bold">Communications</h3>
                <p>
                    Vessle may use your Personal Information to contact you with newsletters. You may opt out at
                    any time by selecting “unsubscribe” at the bottom of a newsletter.
                </p>
            </div>

            <div>
                <h3 className="font-title text-2xl font-bold">Security</h3>
                <p>
                    The security of your Personal Information is important to us. Remember that no method of
                    transmission over the Internet, or method of electronic storage, is 100% secure. While Vessle
                    strives to use commercially acceptable means to protect your Personal Information, absolute
                    security cannot be guaranteed.
                </p>
            </div>

            <div>
                <h3 className="font-title text-2xl font-bold">Changes to This Privacy Policy</h3>
                <p>
                    Vessle reserves the right to update or change our Privacy Policy at any time and you should
                    check this Privacy Policy periodically. Your continued use of the Service after any
                    modifications to the Privacy Policy on this page will constitute your acknowledgment of the
                    modifications and your consent to abide and be bound by the modified Privacy Policy.
                </p>

                <p>
                    If any material change is made to this Privacy Policy, you will be notified either through
                    the email address you have provided us, or by placing a prominent notice on our website.
                </p>
            </div>
            <div>
                <h3 className="font-title text-2xl font-bold">Contact</h3>
                <p>
                    If you have any questions about this Privacy Policy, please contact the developer at
                    {" "}<a href="mailto:zkzhu@uwaterloo.ca" className="text-secondary">zkzhu@uwaterloo.ca</a>.
                </p>
            </div>
        </div>

    );
}