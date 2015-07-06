define('tvs-videos', function () {
	var videos = {};

	videos.boot = [
		{
			clear: true,
			frame: [],
			wait: 2
		},
		{
			clear: true,
			line: 1,
			frame: [' {0,7}       ', ' {0,7}   {1,7}×{0,7}   {7,0}  Front in Amsterdam -- 1.0, a HUEHUEBR Ally', '  {0,7}  {1,7}×{0,7}  {7,0}   Copyright (C) 2015', '  {0,7}  {1,7}×{0,7}  ', '   {0,7}   '],
			wait: 1
		},
		{
			clear: true,
			line: 1,
			frame: [' {0,7}       ', ' {0,7}   {1,7}×{0,7}   {7,0}  Front in Amsterdam -- 1.0, a HUEHUEBR Ally', '  {0,7}  {1,7}×{0,7}  {7,0}   Copyright (C) 2015', '  {0,7}  {1,7}×{0,7}  ', '   {0,7}   ', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et dapibus ex. Dui', 's vel massa augue. Aliquam sit amet quam vel neque suscipit cursus. Fusce id con', 'sequat magna. Suspendisse potenti. Suspendisse tempor laoreet justo, ac rhoncus ', 'orci semper eget. Aenean porttitor ipsum enim, sed varius tellus varius a. Nunc ', 'malesuada erat eu leo cursus porta. Donec bibendum tristique orci in rutrum. Cra', 's vehicula nibh nisl, nec aliquet enim aliquet et. Phasellus pulvinar, lorem ut ', 'commodo laoreet, metus nulla sollicitudin arcu, hendrerit bibendum neque nisi ne', 'c urna. Sed ut gravida nunc. Nullam ut justo pulvinar, dapibus diam et, gravida ', 'turpis.Vestibulum semper sagittis nibh, at finibus mi interdum ut. Mauris placer', 'at commodo posuere. Phasellus bibendum quam eu dolor hendrerit mattis. Phasellus', ' eleifend elit et nisi commodo, vel aliquet elit venenatis. Nunc laoreet tristiq', ' ue viverra. In hac habitasse platea dictumst. Nullam feugiat rutrum ex id lacin', ' ia. Nunc vel tempus risus, molestie aliquet nisl. Morbi tristique porttitor lao', ' reet. Nam dapibus nulla sed erat convallis, sed ultrices mi tincidunt. Sed nec ', ' tortor nunc. Etiam vulputate dolor ligula, in vehicula magna rutrum ac. Suspend', ' isse vel feugiat nibh. Nunc ac nunc sed mi porttitor pretium in ac nisl. Cum so', ' ciis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'],
			wait: 4,
			loop: [0, Infinity]
		}
	];

	return videos;
})