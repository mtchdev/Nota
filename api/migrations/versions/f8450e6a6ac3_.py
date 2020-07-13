"""empty message

Revision ID: f8450e6a6ac3
Revises: d8e52342770d
Create Date: 2020-07-13 08:26:02.332669

"""

# revision identifiers, used by Alembic.
revision = 'f8450e6a6ac3'
down_revision = 'd8e52342770d'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    op.add_column('users', sa.Column('id', sa.Integer, primary_key=True))


def downgrade():
    op.drop_column('users', 'id')
