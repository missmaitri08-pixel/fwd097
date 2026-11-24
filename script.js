document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // FEATURE 1: Active Nav Link Highlighter & Smooth Scroll
    // ==========================================
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        
        // Highlight active page link
        if (linkPath === currentPath || (currentPath === "index.html" && linkPath === "#home")) {
            link.classList.add("active");
        }

        // Smooth scroll for internal page anchors
        if (linkPath.startsWith("#")) {
            link.addEventListener("click", (e) => {
                const targetId = linkPath.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            });
        }
    });

    // ==========================================
    // FEATURE 2: Dynamic Tariff Estimator Tool
    // ==========================================
    const tariffRates = {
        standard: {
            "university-guest": { single: 1500, double: 2000 },
            "faculty-guest": { single: 1000, double: 1500 },
            "student-parent": { single: 1000, double: 1500 },
            "external-student": { single: 1000, double: 1500 },
            "private-guest": { single: 1500, double: 2000 },
            "driver": { single: 500, double: 500 }
        },
        vip: {
            "university-guest": { single: 3000, double: 4000 },
            "faculty-guest": { single: 2000, double: 3000 }
        }
    };

    const calcBtn = document.getElementById("calc-tariff-btn");
    if (calcBtn) {
        calcBtn.addEventListener("click", () => {
            const roomType = document.getElementById("calc-room-type").value;
            const category = document.getElementById("calc-category").value;
            const occupancy = document.getElementById("calc-occupancy").value;
            const days = parseInt(document.getElementById("calc-days").value) || 1;
            const resultBox = document.getElementById("calc-result");

            if (tariffRates[roomType] && tariffRates[roomType][category]) {
                const ratePerDay = tariffRates[roomType][category][occupancy];
                const totalAmount = ratePerDay * days;
                resultBox.innerHTML = `<strong>Estimated Total:</strong> ₹${totalAmount.toLocaleString("en-IN")} (${days} day${days > 1 ? 's' : ''} @ ₹${ratePerDay}/day)`;
                resultBox.style.color = "#155724";
            } else {
                resultBox.innerHTML = "<strong>Note:</strong> Selected combination is not available under current tariffs.";
                resultBox.style.color = "#721c24";
            }
        });
    }

    // ==========================================
    // FEATURE 3: Interactive FAQ Accordion
    // ==========================================
    const faqSummaries = document.querySelectorAll(".faq-item summary");
    faqSummaries.forEach(summary => {
        summary.addEventListener("click", function () {
            const parentDetails = this.parentElement;
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== parentDetails) {
                    item.removeAttribute("open");
                }
            });
        });
    });
});



//employee drop down(<option> tag)
(function () {
    var EMPLOYEES_BY_DEPT = {
        "Accounts": [
            { value: "rakesh_mohan", label: "Mr. Rakesh Mohan, Deputy Director (Finance)" },
            { value: "naveen_bisht", label: "Mr. Naveen Bisht, Assistant Registrar (Finance)" },
            { value: "jayasree_a", label: "Ms. Jayasree.A, Assistant (Accounts)" },
            { value: "anjali_mehta", label: "Ms. Anjali Mehta, Office Assistant(Admin.& Accounts)" }
        ],
        "Admin": [
            { value: "95", label: "Prof. K. K. Aggarwal, President" },
            { value: "96", label: "Dr. Ravindra Kumar Soni, Registrar" },
            { value: "97", label: "Mr. Bibhupada Tripathy, Deputy Registrar (Admin)" },
            { value: "107", label: "Mr. Chakrawan singh chahar, Assistant Registrar" },
            { value: "122", label: "Mrs. GVS Nagavardhani, Executive Assistant" },
            { value: "131", label: "Mr. Amit Rawat, Faculty Assistant" },
            { value: "134", label: "Ms. V. Gomasundari, Personal Secretary" },
            { value: "138", label: "Mr. Manoj Kumar Rana, Office Attendant" }
        ],
        "Admission and Examination": [
            { value: "priti_patwal", label: "Ms. Priti Patwal, Assistant Registrar" },
            { value: "bodapatla_mallesha", label: "Mr. Bodapatla Mallesha, Assistant Registrar" },
            { value: "sreedevi_rs", label: "Ms. Sreedevi R.S., Faculty Assistant" },
            { value: "kavita_khanna", label: "Dr. Kavita Khanna, Professor" }
        ],
        "Department of Climate Change": [
            { value: "shyamli_singh", label: "Dr. Shyamli Singh, Associate Professor" },
            { value: "anand_madhukar", label: "Dr. Anand Madhukar, Assistant professor" }
        ],
        "Department of Computer Science and Engineering": [
            { value: "pranab_kr_muhuri", label: "Prof. Pranab Kr.Muhuri, Professor/ Dean" },
            { value: "kavita_khanna_cse", label: "Dr. Kavita Khanna, Professor" },
            { value: "muhammad_abulaish", label: "Prof. Muhammad Abulaish, Professor" },
            { value: "amit_banerjee", label: "Dr. Amit Banerjee, Associate Professor" },
            { value: "reshma_rastogi", label: "Dr. Reshma Rastogi, Associate Professor" },
            { value: "bijoy_chand_chatterjee", label: "Dr. Bijoy Chand Chatterjee, Associate Professor" },
            { value: "shachi_sharma", label: "Dr. Shachi Sharma, Associate Professor" },
            { value: "swati_chandra", label: "Dr. Swati Chandra, Assistant professor" },
            { value: "shashank_sheshar_singh", label: "Dr. Shashank Sheshar Singh, Assistant professor" },
            { value: "ashwini_b", label: "Dr. Ashwini B, Assistant Professor" },
            { value: "praveen_misra", label: "Dr. Praveen Misra, Visiting Associate Professor (SG)" },
            { value: "sonakshi_garg", label: "Dr. Sonakshi Garg, Teaching Fellow, FET" }
        ],
        "Department of International Relations": [
            { value: "2", label: "Prof. Sanjay Chaturvedi, Professor / Dean" },
            { value: "25", label: "Dr. Jayashree Vivekanandan, Associate Professor (SG)" },
            { value: "26", label: "Dr. Soumita Basu, Associate Professor" },
            { value: "32", label: "Dr. Dhananjay Tripathi, Associate Professor (SG)" },
            { value: "42", label: "Dr. Medha Bisht, Associate Professor (SG)" },
            { value: "44", label: "Dr. Nabarun Roy, Assistant Professor (SG)" },
            { value: "45", label: "Dr. Shweta Singh, Associate Professor" },
            { value: "76", label: "Dr. Anmol Mukhia, Assistant professor" },
            { value: "132", label: "Ms. Kalpana, Faculty Assistant" }
        ],
        "Department of Mathematics": [
            { value: "ranjan_kumar_mohanty", label: "Prof. Ranjan Kumar Mohanty, Professor" },
            { value: "deepa_sinha", label: "Prof. Deepa Sinha, Professor / Dean" },
            { value: "pankaj_jain", label: "Prof. Pankaj Jain, Professor/ Dean" },
            { value: "kapil_kumar_sharma", label: "Prof. Kapil Kumar Sharma, Professor" },
            { value: "navnit_jha", label: "Dr. Navnit Jha, Professor / Dean of Students" },
            { value: "jagdish_chand_bansal", label: "Dr. Jagdish Chand Bansal, Professor" },
            { value: "saroj_kumar_sahani", label: "Dr. Saroj Kumar Sahani, Associate Professor" },
            { value: "danish_lohani", label: "Dr. Danish Lohani, Associate Professor" },
            { value: "swati_mishra", label: "Dr. Swati Mishra, Assistant professor" },
            { value: "neeraj_kumar_dhanwani", label: "Dr. Neeraj Kumar Dhanwani, Assistant professor" },
            { value: "amey_shripad_deshpande", label: "Dr. Amey Shripad Deshpande, Assistant professor" },
            { value: "manvi_grover", label: "Dr. Manvi Grover, Teaching Fellow, FET" },
            { value: "garima_fet", label: "Dr. Garima, Teaching Fellow, FET" },
            { value: "sahil_joshi", label: "Dr. Sahil Joshi, Teaching Fellow, FMS" }
        ],
        "Department of Sociology": [
            { value: "ravi_kumar", label: "Dr. Ravi Kumar, Associate Professor (SG)" },
            { value: "chudamani_basnet", label: "Dr. Chudamani Basnet, Assistant Professor (SG)" },
            { value: "mallika_shakya", label: "Dr. Mallika Shakya, Associate Professor" },
            { value: "deo_nath_pathak", label: "Dr. Deo Nath Pathak, Associate Professor" },
            { value: "diya_mehra", label: "Dr. Diya Mehra, Assistant Professor (SG)" },
            { value: "ankur_datta", label: "Dr. Ankur Datta, Associate Professor" },
            { value: "ishita_dey", label: "Dr. Ishita Dey, Assistant Professor (SG)" },
            { value: "ratan_kumar_roy", label: "Dr. Ratan Kumar Roy, Assistant Professor" },
            { value: "sumedha_dutta", label: "Dr. Sumedha Dutta, Assistant Professor" }
        ],
        "Engineering": [
            { value: "mohan_prasad_kediyal", label: "Mr. Mohan Prasad Kediyal, Executive Engineer (Civil)" },
            { value: "manori_yapabandara", label: "Ms. Manori Yapabandara, Assistant Director(Infra)" },
            { value: "vikrant_jain", label: "Mr. Vikrant Jain, Jr.Engineer(Electrical)" },
            { value: "baljit_singh_dhaniya", label: "Mr. Baljit Singh Dhaniya, Jr.Engineer(Civil)" },
            { value: "surendra_kumar", label: "Mr. Surendra Kumar, JE(Civil)" },
            { value: "ankit_kumar_singh", label: "Mr. Ankit Kumar Singh, Junior Engineer (MEP)" }
        ],
        "Environmental Climate": [
            { value: "pooran_c_pandey", label: "Prof. Pooran C. Pandey, Visiting Professor" }
        ],
        "Establishment & Procurement": [
            { value: "sanjeev_kumar_jainth", label: "Mr. Sanjeev Kumar Jainth, Deputy Registrar" },
            { value: "hari_prakash_mandal", label: "Mr. Hari Prakash Mandal, Assistant Registrar" },
            { value: "suresh_kumar", label: "Mr. Suresh Kumar, Office Attendant" }
        ],
        "Faculty of Art & Design": [
            { value: "ambrish_saxena_fad", label: "Prof. Ambrish Saxena, Visiting Professor" },
            { value: "abinash_kumar_jha", label: "Dr. Abinash kumar Jha, Visiting Associate Professor (SG)" }
        ],
        "Faculty of Chemical Sciences": [
            { value: "trapti_aggarwal", label: "Dr. Trapti Aggarwal, Assistant professor" }
        ],
        "Faculty of Economics": [
            { value: "arup_mitra", label: "Prof. Arup Mitra, Professor/ Dean" },
            { value: "snehashish_bhattacharya", label: "Dr. Snehashish Bhattacharya, Associate Professor" },
            { value: "soumya_datta", label: "Dr. Soumya Datta, Associate Professor" },
            { value: "namrata_gulati", label: "Dr. Namrata Gulati, Assistant Professor (SG)" },
            { value: "binoy_goswami", label: "Dr. Binoy Goswami, Associate Professor" },
            { value: "debdatta_saha", label: "Dr. Debdatta Saha, Associate Professor" }
        ],
        "Faculty of Engineering & Technology": [
            { value: "taniya_seth", label: "Dr. Taniya Seth, Teaching Fellow, FET" }
        ],
        "Faculty of International Studies": [
            { value: "sanchi_rai", label: "Dr. Sanchi Rai, Assistant professor" }
        ],
        "Faculty of Legal Studies": [
            { value: "ritu_gupta", label: "Dr. Ritu Gupta, Professor" },
            { value: "ravindra_pratap", label: "Prof. Ravindra Pratap, Professor / Dean" },
            { value: "camena_erica_guneratne", label: "Prof. Camena Erica Guneratne, Professor" },
            { value: "srinivas_burra", label: "Dr. Srinivas Burra, Associate Professor" },
            { value: "nafees_ahmad", label: "Dr. Nafees Ahmad. Associate Professor" },
            { value: "garimella_sai_ramani", label: "Dr. Garimella Sai Ramani, Associate Professor" },
            { value: "stellina_jolly", label: "Dr. Stellina Jolly, Associate Professor (SG)" },
            { value: "daksha_sharma", label: "Dr. Daksha Sharma, Assistant Professor" },
            { value: "balram_prasad_raut", label: "Dr. Balram Prasad Raut, Assistant Professor" },
            { value: "kajori_bhatnagar", label: "Dr. Kajori Bhatnagar, Assistant Professor" }
        ],
        "Faculty of Life Science & Biotechnology": [
            { value: "senthil_kumar_venugopal", label: "Prof. Senthil Kumar Venugopal, Professor" },
            { value: "ritu_gaur_flsb", label: "Prof. Ritu Gaur, Professor/ Dean" },
            { value: "dinesh_kumar", label: "Prof. Dinesh Kumar, Professor" },
            { value: "rinkoo_devi_gupta", label: "Dr. Rinkoo Devi Gupta, Associate Professor(SG)" },
            { value: "ravi_shankar_akundi", label: "Dr. Ravi Shankar Akundi, Associate Professor" },
            { value: "priti_saxena", label: "Dr. Priti Saxena, Associate Professor" },
            { value: "ananda_mustafiz", label: "Dr. Ananda Mustafiz, Associate Professor (SG)" },
            { value: "yuba_raj_pokharel", label: "Dr. Yuba Raj Pokharel, Associate Professor (SG)" },
            { value: "akr_gobinath", label: "Dr. AKR Gobinath, Associate Professor" },
            { value: "vivek_dixit", label: "Dr. Vivek Dixit, Assistant Professor (SG)" },
            { value: "sonam_dhamija", label: "Dr. Sonam Dhamija, Assistant professor" },
            { value: "milind_dongardive", label: "Mr. Milind Dongardive, Technical Assistant" },
            { value: "j_muraleedharan", label: "Mr. J.Muraleedharan, Faculty Assistant" },
            { value: "simple_kumari", label: "Ms. Simple Kumari, Laboratory Technician-FLSB" },
            { value: "bhuwan_chandra_pande", label: "Mr. Bhuwan Chandra Pande, Laboratory Assistant-FLSB" }
        ],
        "Faculty of Management": [
            { value: "sunil_kumar", label: "Dr. Sunil Kumar, Associate Professor" },
            { value: "ashish_gupta", label: "Dr. Ashish Gupta, Assistant Professor" },
            { value: "parul_kumar", label: "Dr. Parul Kumar, Assistant Professor" },
            { value: "sachin_gupta", label: "Dr. Sachin Gupta, Assistant Professor" }
        ],
        "Faculty of Physical Sciences": [
            { value: "physics_nodal", label: "Faculty / Nodal Member, Faculty of Physical Sciences" }
        ],
        "Information and Communications Technology": [
            { value: "aslam_ali_ansari", label: "Aslam Ali Ansari, Senior System Analyst (ICT)" }
        ],
        "Library": [
            { value: "abdullah_al_modabber", label: "Abdullah al-Modabber, Deputy Librarian" }
        ],
        "Media & Public Relation": [
            { value: "pallavi_kaushik", label: "Ms. Pallavi Kaushik, Assistant Director (Media & PR)" },
            { value: "swati_arjun", label: "Dr. Swati arjun, Deputy Director (Media & PR)" },
            { value: "mohan_singh", label: "Mr. Mohan Singh, Office Assistant II" }
        ],
        "Medical": [
            { value: "priyadarshni_kdk", label: "Ms. Priyadarshni K.D.K, Medical Officer" }
        ],
        "President's Office": [
            { value: "jitender_kumar", label: "Mr. Jitender Kumar, Office Attendant" }
        ],
        "Procurement": [
            { value: "samson_george", label: "Mr. Samson George, Personal Secretary" }
        ],
        "Public Relation Officer & Officer In-charge Guest House": [
            { value: "om_prakash_yadav", label: "Dr. Om Prakash Yadav, Public Relation Officer/Media Officer" }
        ],
        "Quantum Computing": [
            { value: "jyotsna_sharma", label: "Dr. Jyotsna Sharma, Associate Professor (SG)" },
            { value: "satya_n_gupta", label: "Dr. Satya N. Gupta, Visiting Professor" }
        ],
        "REGISTRAR'S OFFICE": [
            { value: "savita_rana", label: "Ms. Savita Rana, Library Assistant" }
        ],
        "Students Welfare": [
            { value: "vineet_ghildyal", label: "Mr. Vineet Ghildyal, Assistant Director(ICT)" }
        ],
        "Training & Placement": [
            { value: "shubham_mahajan", label: "Mr. Shubham Mahajan, Assistant Director (Training & Placement)" }
        ],
        "Virtual Campus": [
            { value: "vinay_kumar_sharma", label: "Mr. Vinay Kumar Sharma, Systems Analyst" },
            { value: "anshul_mathur", label: "Dr. Anshul Mathur, Assistant Director" }
        ]
    };

    window.SAU_EMPLOYEES_BY_DEPT = EMPLOYEES_BY_DEPT;

    function initBookingForm() {
        var bookingThrough = document.getElementById("booking_through");
        var deptGroup = document.getElementById("dept_group");
        var empGroup = document.getElementById("emp_group");
        var deptSelect = document.getElementById("department");
        var empSelect = document.getElementById("employee_name");

        if (!bookingThrough || !deptSelect || !empSelect) return;

        function populateEmployees() {
            var selectedDept = deptSelect.value;
            var list = EMPLOYEES_BY_DEPT[selectedDept] || [];

            empSelect.innerHTML = '<option value="">----Select Employees----</option>';

            list.forEach(function (emp) {
                var opt = document.createElement("option");
                opt.value = emp.value;
                opt.textContent = emp.label;
                empSelect.appendChild(opt);
            });
        }

        function toggleRecommenderFields() {
            var isDirect = bookingThrough.value === "Direct";

            if (deptGroup) deptGroup.classList.toggle("is-hidden-direct", isDirect);
            if (empGroup) empGroup.classList.toggle("is-hidden-direct", isDirect);

            deptSelect.disabled = isDirect;
            empSelect.disabled = isDirect;
            deptSelect.setAttribute("aria-disabled", String(isDirect));
            empSelect.setAttribute("aria-disabled", String(isDirect));

            if (isDirect) {
                deptSelect.removeAttribute("required");
                empSelect.removeAttribute("required");
                deptSelect.value = "";
                empSelect.innerHTML = '<option value="">----Select Employees----</option>';
            } else {
                deptSelect.setAttribute("required", "required");
                empSelect.setAttribute("required", "required");
                populateEmployees();
            }
        }

        bookingThrough.addEventListener("change", toggleRecommenderFields);
        bookingThrough.addEventListener("input", toggleRecommenderFields);
        deptSelect.addEventListener("change", populateEmployees);

        toggleRecommenderFields();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initBookingForm);
    } else {
        initBookingForm();
    }
})();