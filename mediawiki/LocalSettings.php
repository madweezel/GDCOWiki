<?php
# This file was automatically generated by the MediaWiki 1.29.0-alpha
# installer. If you make manual changes, please keep track in case you
# need to recreate them later.
#
# See includes/DefaultSettings.php for all configurable settings
# and their default values, but don't forget to make changes in _this_
# file, not there.
#
# Further documentation for configuration settings may be found at:
# https://www.mediawiki.org/wiki/Manual:Configuration_settings

# Protect against web entry
if ( !defined( 'MEDIAWIKI' ) ) {
	exit;
}

## Uncomment this to disable output compression
# $wgDisableOutputCompression = true;

$wgSitename = "GDCO Runbook Wiki";
$wgMetaNamespace = "GDCO_Runbook_Wiki";

## The URL base path to the directory containing the wiki;
## defaults for all runtime URL paths are based off of this.
## For more information on customizing the URLs
## (like /w/index.php/Page_title to /wiki/Page_title) please see:
## https://www.mediawiki.org/wiki/Manual:Short_URL
$wgScriptPath = "/wiki";

## The protocol and server name to use in fully-qualified URLs
$wgServer = "http://gdcowiki.azurewebsites.net";

## The URL path to static resources (images, scripts, etc.)
$wgResourceBasePath = $wgScriptPath;

## The URL path to the logo.  Make sure you change this from the default,
## or else you'll overwrite your logo when you upgrade!
$wgLogo = "$wgResourceBasePath/resources/assets/wiki.png";

## UPO means: this is also a user preference option

$wgEnableEmail = false;
$wgEnableUserEmail = true; # UPO

$wgEmergencyContact = "apache@gdcowiki.azurewebsites.net";
$wgPasswordSender = "apache@gdcowiki.azurewebsites.net";

$wgEnotifUserTalk = false; # UPO
$wgEnotifWatchlist = false; # UPO
$wgEmailAuthentication = true;

## Database settings
$wgDBtype = "sqlite";
$wgDBserver = "";
$wgDBname = "my_wiki";
$wgDBuser = "";
$wgDBpassword = "";

# SQLite-specific settings
$wgSQLiteDataDir = "D:\\home\\site\\data";
$wgObjectCaches[CACHE_DB] = [
	'class' => 'SqlBagOStuff',
	'loggroup' => 'SQLBagOStuff',
	'server' => [
		'type' => 'sqlite',
		'dbname' => 'wikicache',
		'tablePrefix' => '',
		'dbDirectory' => $wgSQLiteDataDir,
		'flags' => 0
	]
];

## Shared memory settings
$wgMainCacheType = CACHE_ACCEL;
$wgMemCachedServers = [];

## To enable image uploads, make sure the 'images' directory
## is writable, then set this to true:
$wgEnableUploads = true;
#$wgUseImageMagick = true;
#$wgImageMagickConvertCommand = "/usr/bin/convert";

# InstantCommons allows wiki to use images from https://commons.wikimedia.org
$wgUseInstantCommons = false;

# Periodically send a pingback to https://www.mediawiki.org/ with basic data
# about this MediaWiki instance. The Wikimedia Foundation shares this data
# with MediaWiki developers to help guide future development efforts.
$wgPingback = false;

## If you use ImageMagick (or any other shell command) on a
## Linux server, this will need to be set to the name of an
## available UTF-8 locale
$wgShellLocale = "en_US.utf8";

## Set $wgCacheDirectory to a writable directory on the web server
## to make your wiki go slightly faster. The directory should not
## be publically accessible from the web.
#$wgCacheDirectory = "$IP/cache";

# Site language code, should be one of the list in ./languages/data/Names.php
$wgLanguageCode = "en";

$wgSecretKey = "368262a82fdee379510afd496a8e75912603b41b6cc675c35a8ae6780a2e4fc8";

# Changing this will log out all existing sessions.
$wgAuthenticationTokenVersion = "1";

# Site upgrade key. Must be set to a string (default provided) to turn on the
# web installer while LocalSettings.php is in place
$wgUpgradeKey = "50126ad899b20234";

## For attaching licensing metadata to pages, and displaying an
## appropriate copyright notice / icon. GNU Free Documentation
## License and Creative Commons licenses are supported so far.
$wgRightsPage = ""; # Set to the title of a wiki page that describes your license/copyright
$wgRightsUrl = "";
$wgRightsText = "";
$wgRightsIcon = "";

# Path to the GNU diff3 utility. Used for conflict resolution.
$wgDiff3 = "";

# The following permissions were set based on your choice in the installer
$wgGroupPermissions['*']['createaccount'] = false;
$wgGroupPermissions['*']['edit'] = false;



## Default skin: you can change the default skin. Use the internal symbolic
## names, ie 'vector', 'monobook':
$wgDefaultSkin = "Vector";

# Enabled extensions. Most of the extensions are enabled by adding
# wfLoadExtensions('ExtensionName');
# to LocalSettings.php. Check specific extension documentation for more details.
# The following extensions were automatically enabled:


# End of automatically generated settings.
# Add more configuration options below.
wfLoadSkin('Vector');
wfLoadSkin( 'MonoBook' );
wfLoadSkin( 'Modern' );

error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

# Set Allowed File Extensions for upload
$wgGroupPermissions['user']['upload'] = true;
# $wgGroupPermissions['uploadaccess']['upload'] = true;

#  $wgUploadDirectory = "D:\\home\\site\\wwwroot\\uploads";
$wgFileExtensions = array( 'png', 'gif', 'jpg', 'jpeg', 'pdf' );
$wgFileBlacklist = array('exe');


#
# OAUTH Setup
#

# wfLoadExtension( 'MW-OAuth2Client' );


# $wgOAuth2Client['client']['id']     = ''; // The client ID assigned to you by the provider
# $wgOAuth2Client['client']['secret'] = ''; // The client secret assigned to you by the provider
# 
# $wgOAuth2Client['configuration']['authorize_endpoint']     = ''; // Authorization URL
# $wgOAuth2Client['configuration']['access_token_endpoint']  = ''; // Token URL
# $wgOAuth2Client['configuration']['api_endpoint']           = ''; // URL to fetch user JSON
# $wgOAuth2Client['configuration']['redirect_uri']           = ''; // URL for OAuth2 server to redirect to
# 
# $wgOAuth2Client['configuration']['username'] = 'username'; // JSON path to username
# $wgOAuth2Client['configuration']['email'] = 'email'; // JSON path to email




