from django.db import migrations, models


class Migration(migrations.Migration):
    """Add the OIDC `picture` claim (AIP avatar URL) to users (OVHP-126)."""

    dependencies = [
        ("core", "0035_address_normalization"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="avatar",
            field=models.URLField(
                blank=True, max_length=1024, null=True, verbose_name="avatar"
            ),
        ),
    ]