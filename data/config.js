const CONFIG = {

    appName: "إدارة أنظمة المراقبة الأمنية",

    department: "قسم التشغيل CCTV",

    company: "تحكم",

    arrivalDistance: 5,

    autoSaveSeconds: 5,

    gpsHighAccuracy: true,

    maxImageSize: 10,

    allowedImages: [

        "image/jpeg",

        "image/png",

        "image/webp"

    ],

    status: {

        working:{

            text:"يعمل",

            color:"#18b66b"

        },

        notworking:{

            text:"لا يعمل",

            color:"#ff9800"

        },

        workingClean:{

            text:"يعمل ولا توجد مخالفات",

            color:"#8b5e3c"

        },

        notworkingViolation:{

            text:"لا يعمل وتوجد مخالفات",

            color:"#7b61ff"

        },

        notworkingClean:{

            text:"لا يعمل ولا توجد مخالفات",

            color:"#d62828"

        }

    },

    storageTypes:[

        "فلاش",

        "2 فلاش",

        "3 فلاشات",

        "هارديسك",

        "يسحب يدوي",

        "أونلاين"

    ]

};
