(function() {
    'use strict';
        window.onscroll = function() {scrollFunction()};

        function checkClass(item, cname) {
            for(var i = 0; i < item.classList.length; i++) {
                if(item.classList[i] == cname) {
                    return true;
                }
            }
            return false;
        }

        function elemOffset(elemid) {
            var bodyRect = document.body.getBoundingClientRect();
            var element = document.getElementById(elemid);
            var elemRect = element.getBoundingClientRect();
            var offset   = elemRect.top - bodyRect.top;
            return offset;
        }

        function newLabeledBar(parentelem, label, xpos, ht) {
            var newLabel = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            newLabel.setAttribute("x",xpos);
            newLabel.setAttribute("y","325");
            newLabel.setAttribute("fill","white");
            newLabel.setAttribute("class","bar-label");
            newLabel.textContent = label;
            parentelem.appendChild(newLabel);
            var newBar = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
            newBar.setAttribute("id", "bar" + label);
            newBar.setAttribute("x",xpos);
            newBar.setAttribute("y","305");
            newBar.setAttribute("rx",10);
            newBar.setAttribute("ry",10);
            newBar.setAttribute("class", "skill-bar growbar" + ht);
            parentelem.appendChild(newBar);
        }

        var curxpos = 120;
        var xinc = 60;
        function scrollFunction() {
            // Get current nav item
            var appElement = document.querySelector('[ng-app=myApp]');
            var $scope = angular.element(appElement).scope();
            var navbar = document.getElementById('navbar');
            var navRect = navbar.getBoundingClientRect();
            var item = 'about';

            if(window.scrollY > elemOffset('contact')) {
                item = 'contact';
            } 
            else if (window.scrollY > elemOffset('projects')) {
                item = 'projects';
            }
            else if (window.scrollY > elemOffset('skills')) {
                item = 'skills';
            }
            else {
                item = 'about'
            }
  
            // Set current nav item
            if($scope.curNavItem != item + 'nav') {
                document.getElementById($scope.curNavItem).classList.remove('curnav');
                document.getElementById(item + 'nav').classList.add('curnav');
                $scope.curNavItem = item + 'nav';
            }

            // Enter career path box
            var screenBot = window.scrollY+$(window).height();
            var jobcards = elemOffset('scont');
            // Scroll cards to the left and bring up the bar graph from the bottom
            if(window.scrollY > jobcards-800 && screenBot < elemOffset('projects')) {
                var val = 1000-(window.scrollY-(jobcards-100));
                var valt = window.scrollY-(jobcards);
                for(var i=0; i < 6; i++) {
                    $("#user" + i).css("left",val+(950*i));
                    //$("#skbox").css("left",val+(980));
                }
                if(val > 280) {
                    $("#skbox").css("top",val);
                }
                else {
                    $("#skbox").css("top",280);
                }
            }
            else if(window.scrollY > jobcards-800 && screenBot > elemOffset('projects')){
                for(var i=0; i < 6; i++) {
                    var topval = 80-(screenBot-elemOffset('projects'));
                    $("#user" + i).css("top",topval);
                    $("#skbox").css("top",topval+200);
                }
            }

            // Make new bars based on where I am in the card sequence
            var svg = document.getElementsByTagName('svg')[0];
            var javabar = document.getElementById("barJava");
            var cppbar = document.getElementById("barC++");
            var pybar = document.getElementById("barPython");
            var bashbar = document.getElementById("barBash");
            var jsbar = document.getElementById("barJS");
            var htmlbar = document.getElementById("barHTML");
            if(window.scrollY < jobcards+800 && svg.childElementCount > 12 && checkClass(javabar, "growbar50")) {
                javabar.classList.remove("growbar50");
            } 

            if(window.scrollY > jobcards+800 && svg.childElementCount < 12) {
                newLabeledBar(svg, "Java", curxpos, "50");
                console.log(svg.childElementCount);
                curxpos += xinc;
            }

            if(window.scrollY < jobcards+1750 && svg.childElementCount > 14 && checkClass(cppbar, "growbar70")) {
                cppbar.classList.remove("growbar70");
            } 
            if(window.scrollY > jobcards+1750 && svg.childElementCount < 14) {
                javabar.classList.add("growbar50to70");
                newLabeledBar(svg, "C++", curxpos, "70");
                console.log(svg.childElementCount);
                curxpos += xinc;
                newLabeledBar(svg, "Python", curxpos, "50");
                console.log(svg.childElementCount);
                curxpos += xinc;
            }

            if(window.scrollY > jobcards+2700 && svg.childElementCount < 18) {
                cppbar.classList.add("growbar70to120");
                pybar.classList.add("growbar50to120");
                newLabeledBar(svg, "HTML", curxpos, "50");
                console.log(svg.childElementCount);
                curxpos += xinc;
                newLabeledBar(svg, "Bash", curxpos, "70");
                console.log(svg.childElementCount);
                curxpos += xinc;
            }
                
            if(window.scrollY > jobcards+3650 && svg.childElementCount < 22) {
                pybar.classList.add("growbar120to140");
                newLabeledBar(svg, "C", curxpos, "70");
                console.log(svg.childElementCount);
                curxpos += xinc;
            }

            if(window.scrollY > jobcards+4600 && svg.childElementCount < 24) {
                bashbar.classList.add("growbar70to120");
                newLabeledBar(svg, "JS", curxpos, "50");
                console.log(svg.childElementCount);
                curxpos += xinc;
            }


            if(window.scrollY > jobcards+5550 && svg.childElementCount < 34) {
                cppbar.classList.add("growbar120to140");
                jsbar.classList.add("growbar50to120");
                pybar.classList.add("growbar140to170");
                htmlbar.classList.add("growbar50to120");

                newLabeledBar(svg, "CSS", curxpos, "70");
                console.log(svg.childElementCount);
                curxpos += xinc;
                newLabeledBar(svg, "Django", curxpos, "120");
                console.log(svg.childElementCount);
                curxpos += xinc;
                newLabeledBar(svg, "AngularJS", curxpos, "70");
                console.log(svg.childElementCount);
                curxpos += xinc;
                newLabeledBar(svg, "Bootstrap", curxpos, "50");
                console.log(svg.childElementCount);
                curxpos += xinc;
                newLabeledBar(svg, "AWS", curxpos, "120");
                console.log(svg.childElementCount);
                curxpos += xinc;
            }
        }

	var app = angular.module('myApp', ['ngMaterial', 'hl.sticky']);
	app.controller('myCtrl', function($scope) {
            $scope.curNavItem = "aboutnav";
            $scope.contact = {};
            $scope.users = [
                {
                    "title":"Started at UIUC", 
                    "text":"Started a new life at the University of Illinois, Urbana-Champaign in August 2012.",
                    "righttext":"Student",
                    "details": [
                        {
                            "item": "Graduated Saludatorian of my high school class."
                        },
                        {
                            "item": "Took an AP Computer Science course, where I learned the basics of Computer Science by using Java."
                        }
                    ],
                    "id":0
                }, 
                {
                    "title":"Illinois Relativity Group",
                    "text":"Started working in Professor Stu Shapiro\'s research group in May 2014, doing scientific astrophysical visualizations.", 
                    "righttext":"Undergraduate Research Assistant",
                    "details": [ 
                        {
                            "item": "At this point, I had taken 3 CS courses, which built up my Java and C++ skills, especially my algorithmic and data structure skills."
                        },
                        {
                            "item": "In this research group I would create Python scripts for a visualization software called VisIt, and do data processing using C++ and Bash."
                        },
                        {
                            "item": "I also parallelized our scripts so that we could use the Blue Waters Supercomputer to generate a high volume of images very quickly."
                        }
                    ],
                    "id":1
                }, 
                {
                    "title":"Teaching Assistant", 
                    "text":"Started work as a Teaching Assistant in the Physics Department, and ended up being a Teaching Assistant for two classes, PHYS 102 and PHYS 123",
                    "righttext":"Physics Lab Teaching Assistant",
                    "details": [
                        {
                            "item": "In the first class, I was in charge of two lab sections, where I would guide the students through the labs, grade their lab reports, and proctor their exams."
                        },
                        {
                            "item": "The second class focused more on teaching Physics concepts to teachers, so that they could later teach the to their students."
                        }
                    ],
                    "id":2
                }, 
                {
                    "title":"Graduated UIUC", 
                    "text":"Graduated from UIUC in May 2016 with a Bachelor of Science in Engineering Physics, with a concentration in Astrophysics, and a Minor in Math and a Minor in Computer Science.",
                    "righttext":"Graduate",
                    "details": [ 
                        {
                            "item": "By now, I had worked in a Research Lab for 2 years, which had greatly boosted my Python, C++, and Bash skills."
                        },
                        {
                            "item": "I had also taken many Computer Science courses, increasing my knowledge of parallel processing, graphics, and algorithms, to name a few areas."
                        }
                    ],
                    "id":3
                }, 
                {
                    "title":"Ag-Sensus, LLC", 
                    "text":"Started working as Lead Backend Developer for Ag-Sensus, LLC in October 2016, and went on to create a cloud-based server and new user website.",
                    "righttext":"Lead Back-end Developer",
                    "details": [
                        {
                            "item": "Shortly after finishing up the summer in my research group, I was hired by a small software-focused Precision Agricultural startup, Ag-Sensus, LLC."
                        },
                        {
                            "item": "As Lead Back-end Developer, my tasks were to build a server to store all of the agricultural data, as migrate the image processing to the cloud."
                        }
                    ],
                    "id":4
                },
                {
                    "title":"Currently", 
                    "text":"Still working at Ag-Sensus, LLC, where I have transitioned into a Full-Stack Developer position.",
                    "righttext":"Senior Software Developer",
                    "details": [
                        {
                            "item":"I have now transitioned to a more general software development role, where I manage the backend, but also work on the front-end, building websites that interact with the server."
                        },
                        {
                            "item":"I also manage the part-time student developers/interns, checking up on their progress and helping to make sure that we meet deadlines."
                        }
                    ],
                    "id":5
                }];

            for(var user in $scope.users) {
                $("#user" + user.id).css("top", "500px");
                $("#user" + user.id).css("left", "1000px");
                $("#user" + user.id).css("position", "fixed");
                $("#user" + user.id).css("transition", "opacity 0.9s ease-in-out");
                $("#user" + user.id).css("transition", "left 0.9s ease-in-out");
            }
            $('#label1').css('opacity', '0.0');

            $scope.scrollToSection = (sec) => {
                var secoffset = elemOffset(sec);
                var navbar = document.getElementById('navbar');
                var navRect = navbar.getBoundingClientRect();
                secoffset = secoffset-navRect.height;
                $("body").animate({scrollTop:secoffset});
            }

            $scope.changeNav = (item) => {
                $scope.scrollToSection(item);
                document.getElementById($scope.curNavItem).classList.remove('curnav');
                document.getElementById(item + 'nav').classList.add('curnav');
                $scope.curNavItem = item + 'nav';
            }

            //$scope.changeNav($scope.curNavItem);
	});
 
    app.config(function($mdThemingProvider) {
       $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();
    });
})();
