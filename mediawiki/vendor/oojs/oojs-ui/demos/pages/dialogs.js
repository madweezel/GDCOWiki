Demo.static.pages.dialogs = function ( demo ) {
	var i, l, name, openButton, DialogClass, config, configQuick,
		loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' +
			'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\u200E',
		$demo = demo.$element,
		fieldset = new OO.ui.FieldsetLayout( { label: 'Dialogs' } ),
		windows = {},
		windowManager = new OO.ui.WindowManager();

	function SimpleDialog( config ) {
		SimpleDialog.parent.call( this, config );
	}
	OO.inheritClass( SimpleDialog, OO.ui.Dialog );
	SimpleDialog.static.title = 'Simple dialog';
	SimpleDialog.prototype.initialize = function () {
		var closeButton,
			dialog = this;

		SimpleDialog.parent.prototype.initialize.apply( this, arguments );
		this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );
		this.content.$element.append( '<p>Dialog content</p>' );

		closeButton = new OO.ui.ButtonWidget( {
			label: OO.ui.msg( 'ooui-dialog-process-dismiss' )
		} );
		closeButton.on( 'click', function () {
			dialog.close();
		} );

		this.content.$element.append( closeButton.$element );
		this.$body.append( this.content.$element );
	};
	SimpleDialog.prototype.getBodyHeight = function () {
		return this.content.$element.outerHeight( true );
	};

	function DelayedReadyProcessDialog( config ) {
		DelayedReadyProcessDialog.parent.call( this, config );
	}
	OO.inheritClass( DelayedReadyProcessDialog, SimpleDialog );
	DelayedReadyProcessDialog.prototype.getReadyProcess = function () {
		return DelayedReadyProcessDialog.parent.prototype.getReadyProcess.call( this ).next( function () {
			var deferred = $.Deferred();
			setTimeout( function () {
				deferred.resolve();
			}, 2000 );
			return deferred.promise();
		} );
	};

	function FailedReadyProcessDialog( config ) {
		FailedReadyProcessDialog.parent.call( this, config );
	}
	OO.inheritClass( FailedReadyProcessDialog, SimpleDialog );
	FailedReadyProcessDialog.prototype.getReadyProcess = function () {
		return FailedReadyProcessDialog.parent.prototype.getReadyProcess.call( this ).next( function () {
			return $.Deferred().reject().promise();
		} );
	};

	function FailedSetupProcessDialog( config ) {
		FailedSetupProcessDialog.parent.call( this, config );
	}
	OO.inheritClass( FailedSetupProcessDialog, SimpleDialog );
	FailedSetupProcessDialog.prototype.getSetupProcess = function () {
		return FailedSetupProcessDialog.parent.prototype.getSetupProcess.call( this ).next( function () {
			return $.Deferred().reject().promise();
		} );
	};

	function ProcessDialog( config ) {
		ProcessDialog.parent.call( this, config );
	}
	OO.inheritClass( ProcessDialog, OO.ui.ProcessDialog );
	ProcessDialog.static.title = 'Process dialog';
	ProcessDialog.static.actions = [
		{ action: 'save', label: 'Done', flags: [ 'primary', 'progressive' ] },
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] },
		{ action: 'other', label: 'Other', flags: 'other' }
	];
	ProcessDialog.prototype.initialize = function () {
		ProcessDialog.parent.prototype.initialize.apply( this, arguments );
		this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );
		this.content.$element.append( '<p>Dialog content</p>' );
		this.$body.append( this.content.$element );
	};
	ProcessDialog.prototype.getActionProcess = function ( action ) {
		var dialog = this;
		if ( action ) {
			return new OO.ui.Process( function () {
				dialog.close( { action: action } );
			} );
		}
		return ProcessDialog.parent.prototype.getActionProcess.call( this, action );
	};
	ProcessDialog.prototype.getBodyHeight = function () {
		return this.content.$element.outerHeight( true );
	};

	function LongProcessDialog( config ) {
		ProcessDialog.parent.call( this, config );
	}
	OO.inheritClass( LongProcessDialog, OO.ui.ProcessDialog );
	LongProcessDialog.static.title = 'Process dialog';
	LongProcessDialog.static.actions = [
		{ action: 'save', label: 'Done', flags: [ 'primary', 'progressive' ] },
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] },
		{ action: 'other', label: 'Other', flags: 'other' }
	];
	LongProcessDialog.prototype.initialize = function () {
		var i;

		LongProcessDialog.parent.prototype.initialize.apply( this, arguments );
		this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );
		for ( i = 0; i < 100; i++ ) {
			this.content.$element.append( '<p>Dialog content</p>' );
		}
		this.$body.append( this.content.$element );
	};
	LongProcessDialog.prototype.getActionProcess = function ( action ) {
		var dialog = this;
		if ( action ) {
			return new OO.ui.Process( function () {
				dialog.close( { action: action } );
			} );
		}
		return LongProcessDialog.parent.prototype.getActionProcess.call( this, action );
	};
	LongProcessDialog.prototype.getBodyHeight = function () {
		return this.content.$element.outerHeight( true );
	};

	function SearchWidgetDialog( config ) {
		SearchWidgetDialog.parent.call( this, config );
		this.broken = false;
	}
	OO.inheritClass( SearchWidgetDialog, OO.ui.ProcessDialog );
	SearchWidgetDialog.static.title = 'Search widget dialog';
	SearchWidgetDialog.prototype.initialize = function () {
		var i, items, searchWidget;
		SearchWidgetDialog.parent.prototype.initialize.apply( this, arguments );
		items = [];
		searchWidget = new OO.ui.SearchWidget();
		for ( i = 1; i <= 20; i++ ) {
			items.push( new OO.ui.OptionWidget( { data: i, label: 'Item ' + i } ) );
		}
		searchWidget.results.addItems( items );
		searchWidget.onQueryChange = function () {};
		this.$body.append( searchWidget.$element );
	};
	SearchWidgetDialog.prototype.getBodyHeight = function () {
		return 300;
	};
	SearchWidgetDialog.static.actions = [
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] }
	];
	SearchWidgetDialog.prototype.getActionProcess = function ( action ) {
		var dialog = this;
		return new OO.ui.Process( function () {
			dialog.close( { action: action } );
		} );
	};

	function BrokenDialog( config ) {
		BrokenDialog.parent.call( this, config );
		this.broken = false;
	}
	OO.inheritClass( BrokenDialog, OO.ui.ProcessDialog );
	BrokenDialog.static.title = 'Broken dialog';
	BrokenDialog.static.actions = [
		{ action: 'save', label: 'Save', flags: [ 'primary', 'constructive' ] },
		{ action: 'delete', label: 'Delete', flags: 'destructive' },
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] }
	];
	BrokenDialog.prototype.getBodyHeight = function () {
		return 250;
	};
	BrokenDialog.prototype.initialize = function () {
		BrokenDialog.parent.prototype.initialize.apply( this, arguments );
		this.content = new OO.ui.PanelLayout( { padded: true } );
		this.fieldset = new OO.ui.FieldsetLayout( {
			label: 'Dialog with error handling', icon: 'alert'
		} );
		this.description = new OO.ui.LabelWidget( {
			label: 'Deleting will fail and will not be recoverable. ' +
				'Saving will fail the first time, but succeed the second time.'
		} );
		this.fieldset.addItems( [ this.description ] );
		this.content.$element.append( this.fieldset.$element );
		this.$body.append( this.content.$element );
	};
	BrokenDialog.prototype.getSetupProcess = function ( data ) {
		return BrokenDialog.parent.prototype.getSetupProcess.call( this, data )
			.next( function () {
				this.broken = true;
			}, this );
	};
	BrokenDialog.prototype.getActionProcess = function ( action ) {
		return BrokenDialog.parent.prototype.getActionProcess.call( this, action )
			.next( function () {
				return 1000;
			}, this )
			.next( function () {
				var closing;

				if ( action === 'save' ) {
					if ( this.broken ) {
						this.broken = false;
						return new OO.ui.Error( 'Server did not respond' );
					}
				} else if ( action === 'delete' ) {
					return new OO.ui.Error( 'Permission denied', { recoverable: false } );
				}

				closing = this.close( { action: action } );
				if ( action === 'save' ) {
					// Return a promise to remaing pending while closing
					return closing;
				}
				return BrokenDialog.parent.prototype.getActionProcess.call( this, action );
			}, this );
	};

	function SamplePage( name, config ) {
		config = $.extend( { label: 'Sample page' }, config );
		SamplePage.parent.apply( this, arguments );
		this.label = config.label;
		this.icon = config.icon;
		if ( this.$element.is( ':empty' ) ) {
			this.$element.text( this.label );
		}
	}
	OO.inheritClass( SamplePage, OO.ui.PageLayout );
	SamplePage.prototype.setupOutlineItem = function ( outlineItem ) {
		SamplePage.parent.prototype.setupOutlineItem.call( this, outlineItem );
		this.outlineItem
			.setMovable( true )
			.setRemovable( true )
			.setIcon( this.icon )
			.setLabel( this.label );
	};

	function BookletDialog( config ) {
		BookletDialog.parent.call( this, config );
	}
	OO.inheritClass( BookletDialog, OO.ui.ProcessDialog );
	BookletDialog.static.title = 'Booklet dialog';
	BookletDialog.static.actions = [
		{ action: 'save', label: 'Done', flags: [ 'primary', 'progressive' ] },
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] }
	];
	BookletDialog.prototype.getBodyHeight = function () {
		return 250;
	};
	BookletDialog.prototype.initialize = function () {
		var dialog;
		BookletDialog.parent.prototype.initialize.apply( this, arguments );

		dialog = this;

		function changePage( direction ) {
			var pageIndex = dialog.pages.indexOf( dialog.bookletLayout.getCurrentPage() );
			pageIndex = ( dialog.pages.length + pageIndex + direction ) % dialog.pages.length;
			dialog.bookletLayout.setPage( dialog.pages[ pageIndex ].getName() );
		}

		this.navigationField = new OO.ui.FieldLayout(
			new OO.ui.ButtonGroupWidget( {
				items: [
					new OO.ui.ButtonWidget( {
						data: 'previous',
						icon: 'previous'
					} ).on( 'click', function () {
						changePage( -1 );
					} ),
					new OO.ui.ButtonWidget( {
						data: 'next',
						icon: 'next'
					} ).on( 'click', function () {
						changePage( 1 );
					} )
				]
			} ),
			{
				label: 'Change page',
				align: 'top'
			}
		);

		this.bookletLayout = new OO.ui.BookletLayout();
		this.pages = [
			new SamplePage( 'page-1', { label: 'Page 1', icon: 'window' } ),
			new SamplePage( 'page-2', { label: 'Page 2', icon: 'window' } ),
			new SamplePage( 'page-3', { label: 'Page 3', icon: 'window' } )
		];
		this.bookletLayout.addPages( this.pages );
		this.bookletLayout.connect( this, { set: 'onBookletLayoutSet' } );
		this.bookletLayout.setPage( 'page-1' );

		this.$body.append( this.bookletLayout.$element );
	};
	BookletDialog.prototype.getActionProcess = function ( action ) {
		if ( action ) {
			return new OO.ui.Process( function () {
				this.close( { action: action } );
			}, this );
		}
		return BookletDialog.parent.prototype.getActionProcess.call( this, action );
	};
	BookletDialog.prototype.onBookletLayoutSet = function ( page ) {
		page.$element.append( this.navigationField.$element );
	};

	function OutlinedBookletDialog( config ) {
		OutlinedBookletDialog.parent.call( this, config );
	}
	OO.inheritClass( OutlinedBookletDialog, OO.ui.ProcessDialog );
	OutlinedBookletDialog.static.title = 'Outlined booklet dialog';
	OutlinedBookletDialog.static.actions = [
		{ action: 'save', label: 'Done', flags: [ 'primary', 'progressive' ] },
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] }
	];
	OutlinedBookletDialog.prototype.getBodyHeight = function () {
		return 250;
	};
	OutlinedBookletDialog.prototype.initialize = function () {
		OutlinedBookletDialog.parent.prototype.initialize.apply( this, arguments );
		this.bookletLayout = new OO.ui.BookletLayout( {
			outlined: true
		} );
		this.pages = [
			new SamplePage( 'small', { label: 'Small', icon: 'window' } ),
			new SamplePage( 'medium', { label: 'Medium', icon: 'window' } ),
			new SamplePage( 'large', { label: 'Large', icon: 'window' } ),
			new SamplePage( 'larger', { label: 'Larger', icon: 'window' } ),
			new SamplePage( 'full', { label: 'Full', icon: 'window' } )
		];

		this.bookletLayout.addPages( this.pages );
		this.bookletLayout.connect( this, { set: 'onBookletLayoutSet' } );
		this.$body.append( this.bookletLayout.$element );
	};
	OutlinedBookletDialog.prototype.getActionProcess = function ( action ) {
		if ( action ) {
			return new OO.ui.Process( function () {
				this.close( { action: action } );
			}, this );
		}
		return OutlinedBookletDialog.parent.prototype.getActionProcess.call( this, action );
	};
	OutlinedBookletDialog.prototype.onBookletLayoutSet = function ( page ) {
		this.setSize( page.getName() );
	};
	OutlinedBookletDialog.prototype.getSetupProcess = function ( data ) {
		return OutlinedBookletDialog.parent.prototype.getSetupProcess.call( this, data )
			.next( function () {
				this.bookletLayout.setPage( this.getSize() );
			}, this );
	};

	function ContinuousOutlinedBookletDialog( config ) {
		ContinuousOutlinedBookletDialog.parent.call( this, config );
	}
	OO.inheritClass( ContinuousOutlinedBookletDialog, OO.ui.ProcessDialog );
	ContinuousOutlinedBookletDialog.static.title = 'Continuous outlined booklet dialog';
	ContinuousOutlinedBookletDialog.static.actions = [
		{ action: 'save', label: 'Done', flags: [ 'primary', 'progressive' ] },
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] }
	];
	ContinuousOutlinedBookletDialog.prototype.getBodyHeight = function () {
		return 250;
	};
	ContinuousOutlinedBookletDialog.prototype.initialize = function () {
		var lipsum;
		ContinuousOutlinedBookletDialog.parent.prototype.initialize.apply( this, arguments );
		this.bookletLayout = new OO.ui.BookletLayout( {
			outlined: true,
			continuous: true
		} );
		lipsum = [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend justo nec erat tempus, quis aliquet augue aliquam. Sed rutrum odio in tellus pharetra, ut mollis est fermentum. ' +
				'Sed egestas dolor libero, a aliquet sem finibus eu. Morbi dolor nisl, pulvinar vitae maximus sed, lacinia eu ipsum. Fusce rutrum placerat massa, vel vehicula nisi viverra nec. ' +
				'Nam at turpis vel nisi efficitur tempor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi aliquam pulvinar fermentum. Maecenas rutrum accumsan lorem ac sagittis. ' +
				'Praesent id nunc gravida, iaculis odio eu, maximus ligula. Praesent ut tellus mollis, pharetra orci vitae, interdum lacus. Nulla sodales lacus eget libero pellentesque tempor.',
			'Ut a metus elementum, eleifend velit et, malesuada enim.',
			'Aenean sem eros, rutrum vitae pulvinar at, vulputate id quam. Quisque tincidunt, ligula pulvinar consequat tempor, tellus erat lobortis nisl, non euismod diam nisl ut libero. Etiam mollis, ' +
				'risus a tincidunt efficitur, ipsum justo ullamcorper sem, id gravida dui lacus quis turpis. In consectetur tincidunt elit in mollis. Sed nec ultricies turpis, at dictum risus. Curabitur ipsum diam, ' +
				'aliquet sit amet ante eu, congue cursus magna. Donec at lectus in nulla ornare faucibus. Vestibulum mattis massa eu convallis convallis. Sed tristique ut quam non eleifend. Nunc aliquam, nisi non ' +
				'posuere dictum, est nunc mollis nisl.',
			'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce laoreet mi mi, nec tempor erat posuere malesuada. Nam dignissim at nisl ac aliquet. In fermentum ' +
				'mauris et tellus fermentum rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam hendrerit diam mauris, id rutrum justo malesuada nec. Duis ',
			'Ut fringilla enim nec augue rutrum, nec vestibulum orci sollicitudin. Donec eget ex tincidunt augue ullamcorper efficitur at sed odio. Praesent ac interdum elit. Suspendisse blandit feugiat pulvinar. '
		];
		this.pages = [
			new SamplePage( 'page1', { label: 'Page 1', icon: 'window', content: [ $( '<h3>' ).text( 'Page 1' ), lipsum[ 0 ] ] } ),
			new SamplePage( 'page2', { label: 'Page 2', icon: 'window', content: [ $( '<h3>' ).text( 'Page 2' ), lipsum[ 1 ] ] } ),
			new SamplePage( 'page3', { label: 'Page 3', icon: 'window', content: [ $( '<h3>' ).text( 'Page 3' ), lipsum[ 2 ] ] } ),
			new SamplePage( 'page4', { label: 'Page 4', icon: 'window', content: [ $( '<h3>' ).text( 'Page 4' ), lipsum[ 3 ] ] } ),
			new SamplePage( 'page5', { label: 'Page 5', icon: 'window', content: [ $( '<h3>' ).text( 'Page 5' ), lipsum[ 4 ] ] } )
		];

		this.bookletLayout.addPages( this.pages );
		this.$body.append( this.bookletLayout.$element );
	};
	ContinuousOutlinedBookletDialog.prototype.getActionProcess = function ( action ) {
		if ( action ) {
			return new OO.ui.Process( function () {
				this.close( { action: action } );
			}, this );
		}
		return ContinuousOutlinedBookletDialog.parent.prototype.getActionProcess.call( this, action );
	};
	ContinuousOutlinedBookletDialog.prototype.getSetupProcess = function ( data ) {
		return ContinuousOutlinedBookletDialog.parent.prototype.getSetupProcess.call( this, data )
			.next( function () {
				this.bookletLayout.setPage( 'page1' );
			}, this );
	};

	function SampleCard( name, config ) {
		OO.ui.CardLayout.call( this, name, config );
		this.$element.text( this.label );
	}
	OO.inheritClass( SampleCard, OO.ui.CardLayout );

	function IndexedDialog( config ) {
		IndexedDialog.parent.call( this, config );
	}
	OO.inheritClass( IndexedDialog, OO.ui.ProcessDialog );
	IndexedDialog.static.title = 'Indexed dialog';
	IndexedDialog.static.actions = [
		{ action: 'save', label: 'Done', flags: [ 'primary', 'progressive' ] },
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] }
	];
	IndexedDialog.prototype.getBodyHeight = function () {
		return 250;
	};
	IndexedDialog.prototype.initialize = function () {
		IndexedDialog.parent.prototype.initialize.apply( this, arguments );
		this.indexLayout = new OO.ui.IndexLayout();
		this.cards = [
			new SampleCard( 'first', { label: 'One' } ),
			new SampleCard( 'second', { label: 'Two' } ),
			new SampleCard( 'third', { label: 'Three' } ),
			new SampleCard( 'fourth', { label: 'Four' } )
		];

		this.indexLayout.addCards( this.cards );
		this.$body.append( this.indexLayout.$element );

		this.indexLayout.getTabs().getItemFromData( 'fourth' ).setDisabled( true );
	};
	IndexedDialog.prototype.getActionProcess = function ( action ) {
		if ( action ) {
			return new OO.ui.Process( function () {
				this.close( { action: action } );
			}, this );
		}
		return IndexedDialog.parent.prototype.getActionProcess.call( this, action );
	};

	function MenuDialog( config ) {
		MenuDialog.parent.call( this, config );
	}
	OO.inheritClass( MenuDialog, OO.ui.ProcessDialog );
	MenuDialog.static.title = 'Menu dialog';
	MenuDialog.static.actions = [
		{ action: 'save', label: 'Done', flags: [ 'primary', 'progressive' ] },
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] }
	];
	MenuDialog.prototype.getBodyHeight = function () {
		return 350;
	};
	MenuDialog.prototype.initialize = function () {
		var menuLayout, positionField, showField, menuPanel, contentPanel;
		MenuDialog.parent.prototype.initialize.apply( this, arguments );

		menuLayout = new OO.ui.MenuLayout();
		positionField = new OO.ui.FieldLayout(
			new OO.ui.ButtonSelectWidget( {
				items: [
					new OO.ui.ButtonOptionWidget( {
						data: 'before',
						label: 'Before'
					} ),
					new OO.ui.ButtonOptionWidget( {
						data: 'after',
						label: 'After'
					} ),
					new OO.ui.ButtonOptionWidget( {
						data: 'top',
						label: 'Top'
					} ),
					new OO.ui.ButtonOptionWidget( {
						data: 'bottom',
						label: 'Bottom'
					} )
				]
			} ).on( 'select', function ( item ) {
				menuLayout.setMenuPosition( item.getData() );
			} ),
			{
				label: 'Menu position',
				align: 'top'
			}
		);
		showField = new OO.ui.FieldLayout(
			new OO.ui.ToggleSwitchWidget( { value: true } ).on( 'change', function ( value ) {
				menuLayout.toggleMenu( value );
			} ),
			{
				label: 'Show menu',
				align: 'top'
			}
		);
		menuPanel = new OO.ui.PanelLayout( { padded: true, expanded: true, scrollable: true } );
		contentPanel = new OO.ui.PanelLayout( { padded: true, expanded: true, scrollable: true } );

		menuLayout.$menu.append(
			menuPanel.$element.append( 'Menu panel' )
		);
		menuLayout.$content.append(
			contentPanel.$element.append(
				positionField.$element,
				showField.$element
			)
		);

		this.$body.append( menuLayout.$element );
	};
	MenuDialog.prototype.getActionProcess = function ( action ) {
		if ( action ) {
			return new OO.ui.Process( function () {
				this.close( { action: action } );
			}, this );
		}
		return MenuDialog.parent.prototype.getActionProcess.call( this, action );
	};

	function ExampleLookupTextInputWidget( config ) {
		config = config || {};
		this.items = config.items || [];
		OO.ui.TextInputWidget.call( this, config );
		OO.ui.mixin.LookupElement.call( this, config );
	}
	OO.inheritClass( ExampleLookupTextInputWidget, OO.ui.TextInputWidget );
	OO.mixinClass( ExampleLookupTextInputWidget, OO.ui.mixin.LookupElement );
	ExampleLookupTextInputWidget.prototype.getLookupRequest = function () {
		return $.Deferred().resolve( [] ).promise( { abort: function () {} } );
	};
	ExampleLookupTextInputWidget.prototype.getLookupCacheDataFromResponse = function () {
		return [];
	};
	ExampleLookupTextInputWidget.prototype.getLookupMenuOptionsFromData = function () {
		return this.items;
	};

	function ExampleCapsuleMultiselectWidget( config ) {
		this.capsulePopupWidget = new OO.ui.NumberInputWidget( {
			isInteger: true
		} );
		this.capsulePopupWidget.connect( this, {
			enter: 'onPopupWidgetEnter'
		} );
		config = $.extend( {}, config, {
			allowArbitrary: true,
			popup: { $content: this.capsulePopupWidget.$element }
		} );
		OO.ui.CapsuleMultiselectWidget.call( this, config );
	}
	OO.inheritClass( ExampleCapsuleMultiselectWidget, OO.ui.CapsuleMultiselectWidget );
	ExampleCapsuleMultiselectWidget.prototype.onPopupWidgetEnter = function () {
		if ( !isNaN( this.capsulePopupWidget.getNumericValue() ) ) {
			this.addItemsFromData( [ this.capsulePopupWidget.getNumericValue() ] );
			this.capsulePopupWidget.setValue( '' );
		}
	};

	function PositionSelectWidget( config ) {
		var verticalPositions, horizontalPositions, $table,
			widget = this;

		PositionSelectWidget.parent.call( this, config );

		verticalPositions = [ 'above', 'top', 'center', 'bottom', 'below' ];
		horizontalPositions = [ 'before', 'start', 'center', 'end', 'after' ];

		$table = $( '<table>' );
		verticalPositions.forEach( function ( v ) {
			var $tr = $( '<tr>' );
			horizontalPositions.forEach( function ( h ) {
				var $td = $( '<td>' );
				$td.append( widget.getOption( h, v ).$element );
				$td.attr( 'title', v + '/' + h );
				$tr.append( $td );
			} );
			$table.append( $tr );
		} );

		this.$element.append( $table );
		this.$element.addClass( 'oo-ui-positionSelectWidget' );
	}
	OO.inheritClass( PositionSelectWidget, OO.ui.RadioSelectWidget );
	PositionSelectWidget.prototype.getOption = function ( h, v ) {
		var option = new OO.ui.RadioOptionWidget( {
			data: {
				horizontalPosition: h,
				verticalPosition: v
			}
		} );
		this.addItems( [ option ] );
		return option;
	};

	function FloatableWidget( config ) {
		// Parent constructor
		FloatableWidget.parent.call( this, config );
		// Mixin constructors
		OO.ui.mixin.FloatableElement.call( this, config );
		OO.ui.mixin.ClippableElement.call( this, config );
	}
	OO.inheritClass( FloatableWidget, OO.ui.Widget );
	OO.mixinClass( FloatableWidget, OO.ui.mixin.FloatableElement );
	OO.mixinClass( FloatableWidget, OO.ui.mixin.ClippableElement );

	function FloatableTest( config ) {
		// Parent constructor
		FloatableTest.parent.call( this, config );
		// Properties
		// Must be equal to dialog width and height
		this.viewportSize = 500;
		// Width and height of scrollable area
		this.outerSize = 1000;
		// Width and height of scrollable container
		this.innerSize = 400;
	}
	OO.inheritClass( FloatableTest, OO.ui.ProcessDialog );
	FloatableTest.static.title = 'FloatableElement test';
	FloatableTest.static.actions = [
		{ action: '', label: 'Cancel', flags: [ 'safe', 'back' ] },
		{ action: 'center', label: 'Center view' }
	];
	FloatableTest.prototype.getBodyHeight = function () {
		return this.viewportSize;
	};
	FloatableTest.prototype.initialize = function () {
		FloatableTest.parent.prototype.initialize.apply( this, arguments );

		this.$container = $( '<div>' ).css( { width: this.outerSize, height: this.outerSize } );
		this.selectWidget = new PositionSelectWidget();
		this.toggleOverlayWidget = new OO.ui.ToggleSwitchWidget( { value: true } );
		this.toggleClippingWidget = new OO.ui.ToggleSwitchWidget( { value: false } );

		this.$floatableContainer = $( '<div>' ).css( { width: this.innerSize, height: this.innerSize } );
		this.floatable = new FloatableWidget( { $floatableContainer: this.$floatableContainer } );
		this.floatable.toggle( false );

		this.floatable.$element.addClass( 'floatableTest-floatable' );
		this.$floatableContainer.addClass( 'floatableTest-container' );

		this.selectWidget.connect( this, { select: 'onSelectPosition' } );
		this.toggleOverlayWidget.connect( this, { change: 'onToggleOverlay' } );
		this.toggleClippingWidget.connect( this, { change: 'onToggleClipping' } );

		this.fieldset = new OO.ui.FieldsetLayout( {
			items: [
				new OO.ui.FieldLayout( this.selectWidget, {
					align: 'top',
					label: 'Floatable position'
				} ),
				new OO.ui.FieldLayout( this.toggleClippingWidget, {
					align: 'inline',
					label: 'Enable clipping'
				} ),
				new OO.ui.FieldLayout( this.toggleOverlayWidget, {
					align: 'inline',
					label: 'Use overlay'
				} )
			]
		} );

		this.$body.append(
			this.$container.append(
				this.$floatableContainer.append( this.fieldset.$element )
			)
		);
		this.$overlay.append( this.floatable.$element );
	};
	FloatableTest.prototype.onSelectPosition = function ( option ) {
		this.floatable.setHorizontalPosition( option.getData().horizontalPosition );
		this.floatable.setVerticalPosition( option.getData().verticalPosition );
	};
	FloatableTest.prototype.onToggleOverlay = function ( useOverlay ) {
		this.floatable.togglePositioning( false );
		this.floatable.toggleClipping( false );
		( useOverlay ? this.$overlay : this.$container ).append( this.floatable.$element );
		this.floatable.togglePositioning( true );
		this.floatable.toggleClipping( this.toggleClippingWidget.getValue() );
	};
	FloatableTest.prototype.onToggleClipping = function ( useClipping ) {
		this.floatable.toggleClipping( useClipping );
	};
	FloatableTest.prototype.centerView = function () {
		var offset = ( this.outerSize - this.viewportSize ) / 2;
		this.$body[ 0 ].scrollTop = offset;
		// Different browsers count scrollLeft in RTL differently,
		// see <https://github.com/othree/jquery.rtl-scroll-type>.
		// This isn't correct for arbitrary offsets, but works for centering.
		this.$body[ 0 ].scrollLeft = offset;
		if ( this.$body[ 0 ].scrollLeft === 0 ) {
			this.$body[ 0 ].scrollLeft = -offset;
		}
	};
	FloatableTest.prototype.getReadyProcess = function () {
		return new OO.ui.Process( function () {
			var offset, side;
			offset = ( this.outerSize - this.innerSize ) / 2;
			side = this.getDir() === 'rtl' ? 'right' : 'left';
			this.$floatableContainer.css( 'top', offset );
			this.$floatableContainer.css( side, offset );

			this.centerView();
			this.selectWidget.selectItemByData( {
				horizontalPosition: 'start',
				verticalPosition: 'below'
			} );

			// Wait until the opening animation is over
			setTimeout( function () {
				this.floatable.toggle( true );
				this.floatable.togglePositioning( true );
				this.floatable.toggleClipping( this.toggleClippingWidget.getValue() );
			}.bind( this ), OO.ui.theme.getDialogTransitionDuration() );
		}, this );
	};
	FloatableTest.prototype.getHoldProcess = function () {
		return new OO.ui.Process( function () {
			this.floatable.toggleClipping( false );
			this.floatable.togglePositioning( false );
			this.floatable.toggle( false );
		}, this );
	};
	FloatableTest.prototype.getActionProcess = function ( action ) {
		if ( action === 'center' ) {
			return new OO.ui.Process( function () {
				this.centerView();
			}, this );
		}
		return FloatableTest.parent.prototype.getActionProcess.call( this, action );
	};

	function DialogWithDropdowns( config ) {
		DialogWithDropdowns.parent.call( this, config );
	}
	OO.inheritClass( DialogWithDropdowns, OO.ui.ProcessDialog );
	DialogWithDropdowns.static.title = 'Dialog with dropdowns ($overlay test)';
	DialogWithDropdowns.static.actions = [
		{ action: 'save', label: 'Done', flags: [ 'primary', 'progressive' ] },
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] }
	];
	DialogWithDropdowns.prototype.getBodyHeight = function () {
		return 300;
	};
	DialogWithDropdowns.prototype.initialize = function () {
		var $spacer = $( '<div>' ).height( 350 );
		DialogWithDropdowns.parent.prototype.initialize.apply( this, arguments );
		this.bookletLayout = new OO.ui.BookletLayout( {
			outlined: true
		} );
		this.pages = [
			new SamplePage( 'info', {
				label: 'Information',
				icon: 'info',
				content: [
					'This is a test of various kinds of dropdown menus and their $overlay config option. ',
					'Entries without any icon use a correctly set $overlay and their menus should be able to extend outside of this small dialog. ',
					'Entries with the ', new OO.ui.IconWidget( { icon: 'alert' } ), ' icon do not, and their menus should be clipped to the dialog\'s boundaries. ',
					'All dropdown menus should stick to the widget proper, even when scrolling while the menu is open.'
				]
			} ),
			new SamplePage( 'dropdown', {
				label: 'DropdownWidget',
				content: [ $spacer.clone(), new OO.ui.DropdownWidget( {
					$overlay: this.$overlay,
					menu: {
						items: this.makeItems()
					}
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'dropdown2', {
				label: 'DropdownWidget',
				icon: 'alert',
				content: [ $spacer.clone(), new OO.ui.DropdownWidget( {
					menu: {
						items: this.makeItems()
					}
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'combobox', {
				label: 'ComboBoxInputWidget',
				content: [ $spacer.clone(), new OO.ui.ComboBoxInputWidget( {
					$overlay: this.$overlay,
					menu: {
						items: this.makeItems()
					}
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'combobox2', {
				label: 'ComboBoxInputWidget',
				icon: 'alert',
				content: [ $spacer.clone(), new OO.ui.ComboBoxInputWidget( {
					menu: {
						items: this.makeItems()
					}
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'lookup', {
				label: 'LookupElement',
				content: [ $spacer.clone(), new ExampleLookupTextInputWidget( {
					$overlay: this.$overlay,
					items: this.makeItems()
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'lookup2', {
				label: 'LookupElement',
				icon: 'alert',
				content: [ $spacer.clone(), new ExampleLookupTextInputWidget( {
					items: this.makeItems()
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'fieldsetandfield', {
				label: 'FieldsetLayout and FieldLayout',
				content: [ $spacer.clone(), new OO.ui.FieldsetLayout( {
					$overlay: this.$overlay,
					label: 'Fieldset',
					help: loremIpsum,
					items: [
						new OO.ui.FieldLayout( new OO.ui.CheckboxInputWidget(), {
							$overlay: this.$overlay,
							align: 'inline',
							label: 'Field',
							help: loremIpsum
						} )
					]
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'fieldsetandfield2', {
				label: 'FieldsetLayout and FieldLayout',
				icon: 'alert',
				content: [ $spacer.clone(), new OO.ui.FieldsetLayout( {
					label: 'Fieldset',
					help: loremIpsum,
					items: [
						new OO.ui.FieldLayout( new OO.ui.CheckboxInputWidget(), {
							align: 'inline',
							label: 'Field',
							help: loremIpsum
						} )
					]
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'popupbutton', {
				label: 'PopupButtonWidget',
				content: [ $spacer.clone(), new OO.ui.PopupButtonWidget( {
					$overlay: this.$overlay,
					label: 'Popup button',
					popup: {
						padded: true,
						$content: this.makeContents()
					}
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'popupbutton2', {
				label: 'PopupButtonWidget',
				icon: 'alert',
				content: [ $spacer.clone(), new OO.ui.PopupButtonWidget( {
					label: 'Popup button',
					popup: {
						padded: true,
						$content: this.makeContents()
					}
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'capsulemenu', {
				label: 'CapsuleMultiselectWidget (menu)',
				content: [ $spacer.clone(), new OO.ui.CapsuleMultiselectWidget( {
					$overlay: this.$overlay,
					menu: {
						items: this.makeItems()
					}
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'capsulemenu2', {
				label: 'CapsuleMultiselectWidget (menu)',
				icon: 'alert',
				content: [ $spacer.clone(), new OO.ui.CapsuleMultiselectWidget( {
					menu: {
						items: this.makeItems()
					}
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'capsulepopup', {
				label: 'CapsuleMultiselectWidget (popup)',
				content: [ $spacer.clone(), new ExampleCapsuleMultiselectWidget( {
					$overlay: this.$overlay
				} ), $spacer.clone() ]
			} ),
			new SamplePage( 'capsulepopup2', {
				label: 'CapsuleMultiselectWidget (popup)',
				icon: 'alert',
				content: [ $spacer.clone(), new ExampleCapsuleMultiselectWidget(), $spacer.clone() ]
			} )
		];
		this.bookletLayout.on( 'set', function ( page ) {
			page.$element[ 0 ].scrollTop = 325;
		} );
		this.bookletLayout.addPages( this.pages );
		this.$body.append( this.bookletLayout.$element );
	};
	DialogWithDropdowns.prototype.makeItems = function () {
		return [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map( function ( val ) {
			return new OO.ui.MenuOptionWidget( {
				data: val,
				label: String( val )
			} );
		} );
	};
	DialogWithDropdowns.prototype.makeContents = function () {
		return $( '<p>' ).text( loremIpsum );
	};

	DialogWithDropdowns.prototype.getActionProcess = function ( action ) {
		if ( action ) {
			return new OO.ui.Process( function () {
				this.close( { action: action } );
			}, this );
		}
		return DialogWithDropdowns.parent.prototype.getActionProcess.call( this, action );
	};

	function DialogWithPopupAndDropdown( config ) {
		DialogWithPopupAndDropdown.parent.call( this, config );
	}
	OO.inheritClass( DialogWithPopupAndDropdown, OO.ui.ProcessDialog );
	DialogWithPopupAndDropdown.static.title = 'Dialog with popup and dropdown (ClippableElement test)';
	DialogWithPopupAndDropdown.static.actions = [
		{ action: 'save', label: 'Done', flags: [ 'primary', 'progressive' ] },
		{ action: 'cancel', label: 'Cancel', flags: [ 'safe', 'back' ] }
	];
	DialogWithPopupAndDropdown.prototype.getBodyHeight = function () {
		return 300;
	};
	DialogWithPopupAndDropdown.prototype.initialize = function () {
		var $spacer = $( '<div>' ).height( 240 );
		DialogWithPopupAndDropdown.parent.prototype.initialize.apply( this, arguments );
		this.bookletLayout = new OO.ui.BookletLayout( {
			outlined: true
		} );
		this.pages = [
			new SamplePage( 'info', {
				label: 'Information',
				icon: 'info',
				content: [
					'Widgets that don\'t use $overlay get clipped at the bottom of their container. ',
					'This is a test of two such cases'
				]
			} ),
			new SamplePage( 'dropdownbottom', {
				label: 'DropdownWidget at bottom',
				content: [ $spacer.clone(), new OO.ui.DropdownWidget( {
					menu: {
						items: this.makeItems()
					}
				} ) ]
			} ),
			new SamplePage( 'popupbottom', {
				label: 'Popup at bottom',
				content: [ $spacer.clone(), new OO.ui.PopupButtonWidget( {
					icon: 'info',
					label: 'Popup here',
					framed: false,
					popup: {
						head: true,
						label: 'More information',
						$content: $( '<p>Extra information here.</p>' ),
						padded: true
					}
				} ) ]
			} )
		];
		this.bookletLayout.addPages( this.pages );
		this.$body.append( this.bookletLayout.$element );
	};
	DialogWithPopupAndDropdown.prototype.makeItems = function () {
		return [ 0, 1, 2, 3, 4 ].map( function ( val ) {
			return new OO.ui.MenuOptionWidget( {
				data: val,
				label: String( val )
			} );
		} );
	};

	DialogWithPopupAndDropdown.prototype.getActionProcess = function ( action ) {
		if ( action ) {
			return new OO.ui.Process( function () {
				this.close( { action: action } );
			}, this );
		}
		return DialogWithPopupAndDropdown.parent.prototype.getActionProcess.call( this, action );
	};

	configQuick = [
		{
			name: 'Quick alert',
			method: 'alert',
			param: 'Alert message.'
		},
		{
			name: 'Quick confirm',
			method: 'confirm',
			param: 'Confirmation message?'
		},
		{
			name: 'Quick prompt',
			method: 'prompt',
			param: 'Text prompt:'
		}
	];

	for ( i = 0, l = configQuick.length; i < l; i++ ) {
		openButton = new OO.ui.ButtonWidget( {
			framed: false,
			icon: 'window',
			label: $( '<span dir="ltr"></span>' ).text( configQuick[ i ].name )
		} );
		openButton.on(
			'click', OO.ui.bind( OO.ui, configQuick[ i ].method, configQuick[ i ].param )
		);
		fieldset.addItems( [ new OO.ui.FieldLayout( openButton, { align: 'inline' } ) ] );
	}

	config = [
		{
			name: 'Simple dialog (small)',
			config: {
				size: 'small'
			}
		},
		{
			name: 'Simple dialog (medium)',
			config: {
				size: 'medium'
			}
		},
		{
			name: 'Simple dialog (large)',
			config: {
				size: 'large'
			}
		},
		{
			name: 'Simple dialog (larger)',
			config: {
				size: 'larger'
			}
		},
		{
			name: 'Simple dialog (full)',
			config: {
				size: 'full'
			}
		},
		{
			name: 'Simple dialog (delayed ready process)',
			dialogClass: DelayedReadyProcessDialog,
			config: {
				size: 'large'
			}
		},
		{
			name: 'Simple dialog (failed ready process)',
			dialogClass: FailedReadyProcessDialog,
			config: {
				size: 'large'
			}
		},
		{
			name: 'Simple dialog (failed setup process)',
			dialogClass: FailedSetupProcessDialog,
			config: {
				size: 'large'
			}
		},
		{
			name: 'Process dialog (medium)',
			dialogClass: ProcessDialog,
			config: {
				size: 'medium'
			}
		},
		{
			name: 'Process dialog (medium, long title)',
			dialogClass: ProcessDialog,
			config: {
				size: 'medium'
			},
			data: {
				title: 'Sample dialog with very long title that does not fit'
			}
		},
		{
			name: 'Process dialog (medium, long)',
			dialogClass: LongProcessDialog,
			config: {
				size: 'medium'
			}
		},
		{
			name: 'Process dialog (full)',
			dialogClass: ProcessDialog,
			config: {
				size: 'full'
			}
		},
		{
			name: 'Search widget dialog (medium)',
			dialogClass: SearchWidgetDialog,
			config: {
				size: 'medium'
			}
		},
		{
			name: 'Broken dialog (error handling)',
			dialogClass: BrokenDialog,
			config: {
				size: 'medium'
			}
		},
		{
			name: 'Booklet dialog',
			dialogClass: BookletDialog,
			config: {
				size: 'medium'
			}
		},
		{
			name: 'Outlined booklet dialog (aside navigation)',
			dialogClass: OutlinedBookletDialog,
			config: {
				size: 'medium'
			}
		},
		{
			name: 'Continuous outlined booklet dialog (aside navigation)',
			dialogClass: ContinuousOutlinedBookletDialog,
			config: {
				size: 'medium'
			}
		},
		{
			name: 'Indexed dialog (tab navigation)',
			dialogClass: IndexedDialog,
			config: {
				size: 'medium'
			}
		},
		{
			name: 'Menu dialog',
			dialogClass: MenuDialog,
			config: {
				size: 'medium'
			}
		},
		{
			name: 'FloatableElement test',
			dialogClass: FloatableTest,
			config: {
				size: 'medium'
			}
		},
		{
			name: 'Dialog with dropdowns ($overlay test)',
			dialogClass: DialogWithDropdowns,
			config: {
				size: 'large'
			}
		},
		{
			name: 'Dialog with popup and dropdown (ClippableElement test)',
			dialogClass: DialogWithPopupAndDropdown,
			config: {
				size: 'large'
			}
		},
		{
			name: 'Message dialog (generic)',
			dialogClass: OO.ui.MessageDialog,
			data: {
				title: 'Continue?',
				message: 'It may be risky'
			}
		},
		{
			name: 'Message dialog (verbose)',
			dialogClass: OO.ui.MessageDialog,
			data: {
				title: 'Continue?',
				message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis laoreet elit. Nam eu velit ullamcorper, volutpat elit sed, viverra massa. Aenean congue aliquam lorem, et laoreet risus condimentum vel. Praesent nec imperdiet mauris. Nunc eros magna, iaculis sit amet ante id, dapibus tristique lorem. Praesent in feugiat lorem, sit amet porttitor eros. Donec sapien turpis, pretium eget ligula id, scelerisque tincidunt diam. Pellentesque a venenatis tortor, at luctus nisl. Quisque vel urna a enim mattis rutrum. Morbi eget consequat nisl. Nam tristique molestie diam ac consequat. Nam varius adipiscing mattis. Praesent sodales volutpat nulla lobortis iaculis. Quisque vel odio eget diam posuere imperdiet. Fusce et iaculis odio. Donec in nibh ut dui accumsan vehicula quis et massa.',
				verbose: true
			}
		},
		{
			name: 'Message dialog (1 action)',
			dialogClass: OO.ui.MessageDialog,
			data: {
				title: 'Storage limit reached',
				message: 'You are out of disk space',
				actions: [
					{
						action: 'accept',
						label: 'Dismiss',
						flags: 'primary'
					}
				]
			}
		},
		{
			name: 'Message dialog (2 actions)',
			dialogClass: OO.ui.MessageDialog,
			data: {
				title: 'Cannot save data',
				message: 'The server is not responding',
				actions: [
					{
						action: 'reject',
						label: 'Cancel',
						flags: [ 'safe', 'back' ]
					},
					{
						action: 'repeat',
						label: 'Try again',
						flags: [ 'primary', 'constructive' ]
					}
				]
			}
		},
		{
			name: 'Message dialog (3 actions)',
			dialogClass: OO.ui.MessageDialog,
			data: {
				title: 'Delete file?',
				message: 'The file will be irreversably obliterated. Proceed with caution.',
				actions: [
					{ action: 'reject', label: 'Cancel', flags: [ 'safe', 'back' ] },
					{ action: 'reject', label: 'Move file to trash' },
					{
						action: 'accept',
						label: 'Obliterate',
						flags: [ 'primary', 'destructive' ]
					}
				]
			}
		}
	];

	function openDialog( name, data ) {
		windowManager.openWindow( name, data );
	}

	for ( i = 0, l = config.length; i < l; i++ ) {
		name = 'window_' + i;
		DialogClass = config[ i ].dialogClass || SimpleDialog;
		windows[ name ] = new DialogClass( config[ i ].config );
		openButton = new OO.ui.ButtonWidget( {
			framed: false,
			icon: 'window',
			label: $( '<span dir="ltr"></span>' ).text( config[ i ].name )
		} );
		openButton.on(
			'click', OO.ui.bind( openDialog, this, name, config[ i ].data )
		);
		fieldset.addItems( [ new OO.ui.FieldLayout( openButton, { align: 'inline' } ) ] );
	}
	windowManager.addWindows( windows );

	$demo.append(
		new OO.ui.PanelLayout( {
			expanded: false,
			framed: true
		} ).$element
			.addClass( 'demo-container' )
			.append( fieldset.$element ),
		windowManager.$element
	);
};
