/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs defined', function() {
            for(feed of allFeeds)
            {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined', function() {
            for(feed of allFeeds)
            {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    /* This suite tests the menu - 
     * checks if its hidden by default and
     * checks if the menu hides/appears after click
     */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default. It checks if the
         * body element have 'menu-hidden' class by default
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * simulates the click and checks if the body class
          * 'menu-hidden' is toggled after click.
          */

          it('changes visibiity on menu icon click', function() {
            $('.icon-list').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.icon-list').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* This tests suite tests the loadFeed() function */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should have at least single .entry element', function(done) {
            expect($('.feed').has('.entry-link').length).toBeGreaterThan(0);
            done();
        });
    });

    /* This test suite checks if the new loaded feed is different that previous one */
    describe('New Feed Selection', function() {
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let firstFeed, secondFeed;
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed');
                loadFeed(1, function() {
                    secondFeed = $('.feed');
                    done();
                });
            });
        });

        it('should contain different content', function(done) {
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });
    });
}());
