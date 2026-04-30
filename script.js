/* Phishing awareness tutorial - script.js
    This scriptcontrols all interactive behaviour 
    navigation
    hotspot click
    tracking whats been viewed
    dispalying response 
    evaluating response and feedback
    progression */

    /* Save current screen so refresh does not allow partcipants to restart and correct answer*/
    function saveProgress(screenId) {
        sessionStorage.setItem('currentScreen', screenId);
    }

    function resumeProgress() {
        const saved = sessionStorage.getItem('currentScreen');
        if (saved) {
            showScreen(saved);
        }
    }


/* Hotspot content data 
    each hotspot has unique id (data-id HTML), a title and body. */

const hotspotData = {
    "s1-sender": {
        title: "suspicious sender address",
        body: `The sender address is <strong>it-support@northumbria-helpdesk.net</strong>.
        Your university's real IT department would email you from an <strong>@northumbria.ac.uk</strong> address.
        The domain <em>northumbria-helpdesk.net</em> is not an official university domain, 
        this is a common phishing tactic in which attackers register domains that
        resemble official ones.
        Remember to always check the full emial address, not just the display name.
        <br><br>
        <strong>Protective action</strong> If the email does not match 
        the university's official email addresses, do not click any links and report the email.`
    },

    "s1-subject": {
        title: "Urgency in subject line",
        body: `Subject line uses the word <strong>URGENT</strong> and states your password will expire in <strong>24 hours</strong>.
        This creates a false sense of urgency which is one of the most common phishing techniques
        Attackers used urgency to pressure recipients into a quick response acting without
        thinking critically, rarely will IT departments send
        urgent subject demanding action immediately.
        <br><br>
        <strong>Protective action</strong>Pause before acting on any email
        that pressures response immediately. Take time to verify senders 
        and check with the IT team directly if unsure.`
    },

    "s1-link": {
        title: "Suspicious link URL",
        body: `The link points to <strong>http://northumbria-reset.com</strong>.
        This is not a university domain. Official university systems use 
        <strong>https://northumbria.ac.uk</strong> addresses.
        Also notice that the link uses <strong>http</strong> instead of 
        <strong>https</strong> meaning its not even using a strong connection.
        Clicking this link could lead to a fake login page designed to steal credentials.
        <br><br>
        <strong>Protective action</strong> Never click password reste links in emails.
        Go directly to the university website by typing the address
        in your browser. Report this email to IT immediately.`
    },

/*   Scenario 2 Hotspots Medium difficulty */

    "s2-sender": {
        title: "Spoofed Domain - Look Carefully",
        body: `The sender address is <strong>financialaid@northurnbria.ac.uk</strong>.
        At first glance, this looks like a legitimate university address. However, the domain is subtly misspelled as <em>northurnbria</em> instead of <em>northumbria</em>.
        Replacing the letter <strong>m</strong> with <strong>rn</strong>,
        which looks very similar in most fonts.
        This is called <strong>typosquatting</strong> and is used to impersonate trusted organisations.
        <br><br>
        <strong>Protective action</strong> Always carefully read sender addresses 
        character by character especially when asking for sensitive actions.
        If you have doubts, contact the financial aid office directly using contact
        details from official university website`
    },

    "s2-link": {
        title: "Unverifiable Link Requesting Sensitive Information",
        body: `The button reads <em>"Confirm My Bank Details"</em>
        but this tells you nothing about where the link actually goes.
        You can reveal the true destination of any link by
        <strong>hovering your mouse over it</strong> without clicking -
        the real URL will appear at the bottom of your browser window.
        In phishing emails the visible link text always looks reassuring
        but the actual destination leads somewhere malicious.
        Importantly, universities and banks will <strong>never</strong> ask
        you to submit bank details via a link in an email -
        this is a universal red flag regardless of how legitimate the email looks.
        <br><br>
        <strong>Protective action:</strong> Always hover over links to check
        the real destination before clicking. Never enter bank details
        via an email link. Contact the Student Finance office directly
        using contact details from the official university website.`

    },

    /* Scenario 3 Hotspots - Hard difficulty */

    "s3-sender": {
        title: "Display Name Spoofing and Homograph Attack",
        body: `The email appears to be from <strong>Dr. James Mitchell</strong>,
        which looks completely authentic. However, look closely at the actual email address:
        <strong>j.mitchell@northumbr1a.ac.uk</strong>.
        The domain contains the number <strong>1</strong> instead of <strong>i</strong>, 
        shown as <em>northumbr1a</em> instead of <em>northumbria</em>.
        This is a common spoofing technique. The display name can be set as anything by the sender,
        the email address itself reveals if the message is genuine.
        <br><br>
        <strong>Protective action</strong> Always expand the sender field 
        to see the full email address. Never trust the display name on its own.
        If you receive an unexpected document, verify by
        contacting the sender through an official channel.`

    },

    "s3-link": {
        title: "Disguised malicious link",
        body: `The link is displayed as <strong>KV600_Feedback_JSmith.docx</strong>,
        which looks like a genuine document filename. However, in an email,
        any text can be made into hyperlinks pointing anywhere.
        This is a very common technique as it tricks users by 
        exploiting trust in specific person or context in this case your Module and Name.
        Clicking this could download malware or direct you to credential stealing log in pages.
        <br><br>
        <strong>Protective action</strong> Be skeptical when it comes to unexpected document links even from people you know, 
        as accounts can be stolen. Verify with the sender using a separate communication channel
        such as in person or official email. before clicking any links and downloading files.`
    } 

};

/* Feeback content data
   Defines the feedback shown after each response.
   Each scenario has three possible responses: click, report, ignore.
   Feedback displays correct or incorrect, and explenation, 
   and reinforcement of the secure protective behaviour. */


const feedbackData = {

    1: {
        click: {
            correct: false,
            icon: "❌",
            title: "Incorrect - you clicked the link",
            message: `Clicking the link in this email would have taken you to a to a fake
            login page designed to steal credentials.
            This email contained several clear indicators of phishing:
            an non-university sender domain, an urgent subject line,
            and a suspicious link URL.
            <br><br>
            The correct action was to <strong>report</strong> this email
            to your IT department so they can inform others whilst blocking the sender.`
        },

        report: {
            correct: true,
            icon: "✅",
            title: "Correct - you reported the email",
            message: `Well done. This was a phishing email containing multiple clear
            indicators: a fake sender domain <em>northumbria-helpdesk.net</em>,
            an urgent subject designed to pressure the recipient into acting quickly,
            and a suspicious link leading to a non-university domain.
            <br><br>
            Reporting phishing emails helps the IT team protect the whole university 
            by blocking the malicious senders.`

        },
        ignore: {
            correct: false,
            icon: "⚠️",
            title: "Partially correct - you ignored the email",
            message: `Ignoring the email means you didn't click the link, which is good .
            However, the safest and best action is to <strong>report</strong> the email to 
            the IT department instead of ignoring it.
            <br><br>
            Reporting informs the team so they can investigate, block the sender, and inform 
            other students who may have received the email.`

        }
    },

    2: {
        click: {
            correct: false,
            icon: "❌",
            title: "Incorrect - you clicked the link",
            message: `This email used a subtly spoofed sender domain
            <em>northurnbria.ac.uk</em> instead of <em>northumbria.ac.uk</em> 
            and a vague hyperlink asking for you to submit bank details.
            Clicking this link could expose your financial information
            to attackers. Universities and financial institutions should
            never request bank details through email links.
            <br><br>
            The correct action was to <strong>report</strong> this email 
            and contact the financial aid office directly using official contact 
            details from the official university website.`

        },

        report: {
            correct: true,
            icon: "✅",
            title: "Correct - you reported the email",
            message: `Well done. This email was a sophisticated phishing email 
            requiring careful inspection to identify. The sender domain
            contained a subtle typo <em>northurnbria</em>, and the email 
            asked for you to submit bank details using a vague hyperlink,
            legitimate university departments would never request this.
            <br><br>
            Reporting this email protects others and yourself 
            from potential financial fraud.`
            
        },
        ignore: {
            correct: false,
            icon: "⚠️",
            title: "Partially correct - you ignored the email",
            message: `Not clicking the email as the right instinct. However,
            ignoring the emails is not enough, <strong>reporting</strong> the
            email to the IT department is the best course of action 
            so the spoofed domain is investigated and blocked.
            <br><br>
            If you are unsure whether it is legitimate, you
            should contact the financial aid office directly
            using contact details from the official university website.`

        }
    },

    3: {
        click: {
            correct: false,
            icon: "❌",
            title: "Incorrect - you clicked the link",
            message: `This was a highly sophisticated phishing email.
            The sender used display name spoofing to impersonate a real 
            lecturer, and the link was disguised as a document filename.
            The actual sender domain <em>northumbr1a.ac.uk</em> 
            contained a subtle swap of characters, easy to miss.
            <br><br>
            When receiving unexpected document links from lecturers,
            verify using a separate channel before clicking.
            Report the email immediately to IT.`

        },
        report: {
            correct: true,
            icon: "✅",
            title: "Correct - you reported the email",
            message: `Excellent. This was the most difficult scenario, using
            advanced display name spoofing and a disguised document link.
            The key indicator were the subtle character substitution
            in the sender domain <em>northumbr1a.ac.uk</em> and the unexpected
            nature of the requests.
            <br><br>
            In real situations, verify unexpected communications
            from lecturers or fellow students through a separate channel
            before clicking links or downloading any files.`

        },
        ignore: {
            correct: false,
            icon: "⚠️",
            title: "Partially correct - you ignored the email",
            message: `Not clicking the link was a good instinct. However this email
            should be <strong>reported</strong> especially when this sophisticated,
            the spoofed sender domain could be used to fool many other students.
            <br><br>
            Always report suspicious emails rather than ignoring, 
            so IT can investigate and protect the wider community.`

        }
    }
};

/* Screen navigation utility
hides all screens, shows only screen with 'active' class*/

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
  // Save current screen so refresh returns here
  saveProgress(id);
}

/* Hotspot tracking
tracks which hotspot have been viewed for each scenario.
The response buttons are only revealed 
once hotpots have been clicked */

const viewedHotspots = {
    1: new Set(),
    2: new Set(),
    3: new Set()
};  

const hotspotCounts = {
    1: 3,
    2: 2,
    3: 2
};

/* Modal functions
openModal: display the pop-up overlay with content
closeModal: hide the pop-up overlay */

function openModal(hotspotId) {
    const data = hotspotData[hotspotId];
    if (!data) return;

    document.getElementById('modal-title').innerHTML = data.title;
    document.getElementById('modal-body').innerHTML = data.body;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

/* Check if all hotspots have been viewed*/

function checkAllHotspotsViewed(scenarioNum) {
    if (viewedHotspots[scenarioNum].size >= hotspotCounts[scenarioNum]) {
        document.getElementById('response-' + scenarioNum).style.display = 'block';
        document.getElementById('response-' + scenarioNum).scrollIntoView({ behavior: 'smooth' });
    }
}

/* Show feedback after response is selected */

function showFeedback(scenarioNum, choice) {
    const fb = feedbackData[scenarioNum][choice];
    const contentEl = document.getElementById('feedback-' + scenarioNum + '-content');

    if (fb.correct) {
        contentEl.classList.add('feedback-correct');
    } else if (choice === 'ignore') {
        contentEl.classList.add('feedback-partial');
    } else {
        contentEl.classList.add('feedback-incorrect');
    }

    contentEl.innerHTML = `
        <div class="feedback-icon">${fb.icon}</div>
        <h2>${fb.title}</h2>
        <p style="margin-top: 16px;">${fb.message}</p>
        <button class="btn-primary" id="feedback-next-${scenarioNum}" style="margin-top: 20px;">
            ${scenarioNum < 3 ? 'Next Scenario' : 'Complete Tutorial'}
        </button>
    `;

    showScreen('feedback-' + scenarioNum);

    document.getElementById('feedback-next-' + scenarioNum).addEventListener('click', function () {
    if (scenarioNum < 3) {
        showScreen('intro-' + (scenarioNum + 1));
    } else {
        showScreen('how-to-report');
    }
});
}

/* Event listeners */

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('start-btn').addEventListener('click', function () {
    showScreen('intro-1');
});

document.getElementById('complete-btn').addEventListener('click', function () {
    window.open('https://forms.office.com/e/GWUvkbJ5NP', '_blank');
    showScreen('completion-screen');
});

    /* View Email buttons on intro screens */
    document.querySelectorAll('.next-intro').forEach(function (btn) {
        btn.addEventListener('click', function () {
            showScreen(btn.getAttribute('data-target'));
        });
    });

    /* Hotspot click handlers */
    document.querySelectorAll('.hotspot').forEach(function (hotspot) {
        hotspot.addEventListener('click', function () {
            const id = hotspot.getAttribute('data-id');

            openModal(id);

            /* Mark this hotspot as viewed */
            hotspot.classList.add('viewed');
            const scenarioNum = parseInt(id.charAt(1));

            /* Record this hotspot as viewed in scenario */
            viewedHotspots[scenarioNum].add(id);

            /* Check if all hotspots are viewed */
            checkAllHotspotsViewed(scenarioNum);
        });
    });

    document.getElementById('modal-close').addEventListener('click', closeModal);

    document.getElementById('modal-overlay').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });

    /* Response button click handlers */
    document.querySelectorAll('.respond-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const scenario = parseInt(btn.getAttribute('data-scenario'));
            const choice = btn.getAttribute('data-choice');
            showFeedback(scenario, choice);
        });
    });

    resumeProgress();

});
