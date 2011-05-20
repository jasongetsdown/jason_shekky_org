#!/usr/local/bin/php4
<?php
$directory = "./images/facts/";
if (glob("$directory*.jpg") != false)
{
 $filecount = count(glob("$directory*.jpg"));
 echo $filecount;
}
else
{
 echo 0;
}
?>